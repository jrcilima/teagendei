import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { 
  getServicesByShop, createService, deleteService,
  getCategoriesByShop, createCategory, deleteCategory 
} from "@/react-app/lib/api/services";
import type { Service, Category } from "@/shared/types";
import Modal from "@/react-app/components/common/Modal";

type Tab = "services" | "categories";

export default function ServicesPage() {
  const { currentShop } = useTenant();
  const [activeTab, setActiveTab] = useState<Tab>("services");
  
  // Listas
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modais
  const [isServiceModalOpen, setServiceModalOpen] = useState(false);
  const [isCatModalOpen, setCatModalOpen] = useState(false);

  // Forms
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDuration, setNewServiceDuration] = useState("30");
  const [newServiceCategory, setNewServiceCategory] = useState("");
  
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!currentShop) return;
      setLoading(true);
      try {
        const [srv, cat] = await Promise.all([
          getServicesByShop(currentShop.id),
          getCategoriesByShop(currentShop.id)
        ]);
        
        if (isMounted) {
          setServices(srv);
          setCategories(cat);
        }
      } catch (err: any) {
        // CORREÇÃO: Ignora erro de auto-cancelamento (status 0)
        if (err.status === 0 || err.isAbort) return;
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentShop?.id]);

  // Função auxiliar para recarregar após ações (create/delete)
  async function reload() {
    if (!currentShop) return;
    setLoading(true);
    try {
        const [srv, cat] = await Promise.all([
            getServicesByShop(currentShop.id),
            getCategoriesByShop(currentShop.id)
        ]);
        setServices(srv);
        setCategories(cat);
    } catch(err: any) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  }

  async function handleCreateService() {
    if (!currentShop) return;
    try {
      await createService({
        name: newServiceName,
        price: Number(newServicePrice.replace(",", ".")),
        duration: Number(newServiceDuration),
        category_id: newServiceCategory || null,
        shop_id: currentShop.id,
        is_active: true
      });
      setServiceModalOpen(false);
      setNewServiceName("");
      setNewServicePrice("");
      reload();
    } catch (err) {
      alert("Erro ao criar serviço");
    }
  }

  async function handleCreateCategory() {
    if (!currentShop) return;
    try {
      await createCategory(currentShop.id, newCatName);
      setCatModalOpen(false);
      setNewCatName("");
      reload();
    } catch (err) {
      alert("Erro ao criar categoria");
    }
  }

  async function handleDeleteService(id: string) {
    if (confirm("Desativar este serviço?")) {
      await deleteService(id);
      reload();
    }
  }

  async function handleDeleteCategory(id: string) {
    if (confirm("Apagar categoria?")) {
      await deleteCategory(id);
      reload();
    }
  }

  if (!currentShop) return <div>Selecione uma unidade.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Catálogo</h1>
        <button 
          onClick={() => activeTab === "services" ? setServiceModalOpen(true) : setCatModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-4 py-2 rounded-xl transition"
        >
          + Novo {activeTab === "services" ? "Serviço" : "Categoria"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        <button 
          onClick={() => setActiveTab("services")}
          className={`pb-3 text-sm font-medium transition border-b-2 ${activeTab === "services" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400"}`}
        >
          Serviços
        </button>
        <button 
          onClick={() => setActiveTab("categories")}
          className={`pb-3 text-sm font-medium transition border-b-2 ${activeTab === "categories" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400"}`}
        >
          Categorias
        </button>
      </div>

      {loading ? <div className="text-slate-500">Carregando...</div> : (
        <div className="grid gap-4">
          
          {/* LISTA SERVIÇOS */}
          {activeTab === "services" && services.map(service => (
            <div key={service.id} className="bg-slate-900 border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-white/10 transition">
              <div>
                <h3 className="font-semibold text-slate-200">{service.name}</h3>
                <p className="text-xs text-slate-500">
                  {service.duration} min • {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price)}
                </p>
              </div>
              <button onClick={() => handleDeleteService(service.id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition px-2">
                Excluir
              </button>
            </div>
          ))}

          {/* LISTA CATEGORIAS */}
          {activeTab === "categories" && categories.map(cat => (
            <div key={cat.id} className="bg-slate-900 border border-white/5 p-4 rounded-xl flex justify-between items-center group">
              <span className="font-medium text-slate-300">{cat.name}</span>
              <button onClick={() => handleDeleteCategory(cat.id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition px-2">
                Excluir
              </button>
            </div>
          ))}
          
          {activeTab === "services" && services.length === 0 && <p className="text-slate-500 text-sm">Nenhum serviço cadastrado.</p>}
          {activeTab === "categories" && categories.length === 0 && <p className="text-slate-500 text-sm">Nenhuma categoria cadastrada.</p>}
        </div>
      )}

      {/* MODAL SERVIÇO */}
      <Modal isOpen={isServiceModalOpen} onClose={() => setServiceModalOpen(false)} title="Novo Serviço">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nome</label>
            <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" 
              value={newServiceName} onChange={e => setNewServiceName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs text-slate-400 mb-1">Preço (R$)</label>
                <input type="number" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" 
                  value={newServicePrice} onChange={e => setNewServicePrice(e.target.value)} />
             </div>
             <div>
                <label className="block text-xs text-slate-400 mb-1">Duração (min)</label>
                <input type="number" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" 
                  value={newServiceDuration} onChange={e => setNewServiceDuration(e.target.value)} />
             </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Categoria</label>
            <select className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-slate-300"
              value={newServiceCategory} onChange={e => setNewServiceCategory(e.target.value)}>
                <option value="">Sem categoria</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button onClick={handleCreateService} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2">Salvar</button>
        </div>
      </Modal>

      {/* MODAL CATEGORIA */}
      <Modal isOpen={isCatModalOpen} onClose={() => setCatModalOpen(false)} title="Nova Categoria">
        <div className="space-y-4">
           <div>
            <label className="block text-xs text-slate-400 mb-1">Nome da Categoria</label>
            <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white" 
              value={newCatName} onChange={e => setNewCatName(e.target.value)} />
          </div>
          <button onClick={handleCreateCategory} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2">Salvar</button>
        </div>
      </Modal>
    </div>
  );
}