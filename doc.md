📋 Visão Geral
TeAgendei é uma plataforma de gestão de agendamentos para negócios de serviços (barbearias, salões, clínicas estéticas, etc.) com arquitetura multi-tenant completa.

🏗️ Arquitetura
Stack Tecnológico

Frontend: React 18 + TypeScript + Vite + Tailwind CSS
Backend: PocketBase (SQLite + API REST integrada)
Roteamento: React Router v7
Estado: Context API (Auth + Tenant)

Estrutura Multi-Tenant
Company (Empresa)
└── Shops (Unidades/Lojas)
├── Services (Serviços)
├── Staff (Profissionais)
└── Appointments (Agendamentos)

👥 Tipos de Usuário

Dono (Owner)

Gerencia empresa, lojas, equipe
Acessa dashboard, financeiro, configurações
Rota base: /owner/\*

Staff (Profissional)

Vê apenas sua própria agenda
Gerencia atendimentos do dia
Rota base: /staff/\*

Cliente

Agenda serviços via link público
Acompanha histórico
Rota: /client

🎯 Funcionalidades Principais

1. Sistema de Agendamento

Engine inteligente de slots (slots.ts)
Previne overbooking
Respeita horários de funcionamento
Considera duração de serviços
Suporta antecedência mínima/máxima

2. Fluxo de Booking (4 Passos)
   StepService → StepProfessional → StepDateTime → StepConfirm
3. Gestão Operacional

Dashboard com KPIs diários
Agenda por profissional
Status de atendimento (9 estados)
Bloqueio de horários
Pagamentos e métodos

4. Financeiro

Receita realizada vs prevista
Receita por método de pagamento
Detalhamento diário
Ticket médio

🔐 Segurança e Regras
Regras do PocketBase

Filtros automáticos por company_id e shop_id
Dono vê tudo da empresa
Staff vê apenas sua loja
Cliente vê apenas seus agendamentos

Exemplo de Regra (Appointments)
javascriptlistRule: "shop_id = @request.auth.shop_id ||
client_id = @request.auth.id ||
barber_id = @request.auth.id"

🚀 Fluxos Críticos
Onboarding do Dono

Criar empresa (CompanyStep)
Criar primeira loja (ShopStep)
Definir se é profissional (OwnerProfessionalStep)
Concluir → Dashboard

Agendamento de Cliente

Acessa /book/:slug
Escolhe serviço
Escolhe profissional (ou "Qualquer")
Escolhe data/hora
Confirma → Cria appointment

Agenda do Staff

Lista appointments do dia
Atualiza status (Pendente → Em Andamento → Concluído)
Registra pagamento ao finalizar
Pode criar novos agendamentos ou bloqueios

🛠️ Destaques Técnicos

1. Gestão de Estado
   typescript// AuthContext: sessão do usuário
   // TenantContext: empresa/loja ativa
   // BookingContext: fluxo de agendamento
2. API Centralizada
   Todas as chamadas ao PocketBase estão em lib/api/\*:

pocketbase.ts - Cliente base
appointments.ts - Agendamentos
availability.ts - Disponibilidade
financial.ts - Dados financeiros
etc.

3. Correções Importantes Aplicadas

✅ Conversão UTC → Local (horários)
✅ Status "6" (Bloqueio) tratado separadamente
✅ Cliente avulso (sem login) suportado
✅ Cancelamento automático de requests ignorado
✅ Validação de colisão de slots corrigida

4. Cálculo de Slots
   typescript// Verifica interseção de intervalos
   return slotStart < busy.end && slotEnd > busy.start;

📊 Banco de Dados (PocketBase)
Coleções Principais
ColeçãoFunçãousersUsuários (auth)companiesEmpresasshopsUnidadesservicesServiçosappointmentsAgendamentosshop_hoursHorários de funcionamentopayment_methodsFormas de pagamentocategoriesCategorias de serviços
Campos Críticos de Appointments
typescript{
client_id?: string; // Cliente cadastrado
customer_name?: string; // Cliente avulso
customer_phone?: string; // Telefone avulso
status: '0'-'9'; // 9 estados possíveis
payment_status: '1'-'3'; // A Pagar, Pago, Pendente
}

```

---

## 🎨 **UI/UX**

- **Design:** Dark mode com Tailwind
- **Responsivo:** Mobile-first
- **Animações:** Transições suaves
- **Feedback:** Toasts, modais, loading states
- **Acessibilidade:** Labels, ARIA

---

## 🔄 **Fluxo de Dados Típico**
```

User Action → Component → Context (se necessário)
→ API Function → PocketBase → Database
→ Response → Update State → Re-render

📝 Pontos de Atenção
Boas Práticas Implementadas
✅ Tratamento de erros robusto
✅ Cancelamento de requests evitado
✅ Validação em múltiplas camadas
✅ Feedback visual consistente
✅ Código tipado (TypeScript)
Limitações Conhecidas
⚠️ Sem localStorage (restrição Claude.ai)
⚠️ Sem notificações push
⚠️ Sem integração de pagamento real
⚠️ Sem modo offline

🎯 Conclusão
O TeAgendei é um projeto profissional e escalável, com:

Arquitetura multi-tenant robusta
Separação clara de responsabilidades
Engine de agendamento inteligente
Fluxos otimizados para cada tipo de usuário
Código limpo e bem documentado

Pronto para produção com pequenos ajustes de infraestrutura e possíveis melhorias incrementais (notificações, relatórios avançados, etc.).
