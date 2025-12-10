# **📘 PROJETO TEAGÊNDEI — DOCUMENTAÇÃO OFICIAL v2.1 (HÍBRIDA)**

Documento Final — Produto \+ Engenharia  
Blueprint completo do sistema antes da codificação.

## **1\. VISÃO GERAL DO PRODUTO**

### **1.1. O que é o TeAgendei**

O TeAgendei é uma plataforma SaaS de agendamentos voltada para pequenos negócios de serviços:

* Barbearias  
* Salões  
* Esmalterias  
* Clínicas estéticas  
* Profissionais autônomos

Ele funciona como um motor de agenda \+ operação \+ faturamento, permitindo que um estabelecimento:

* Gerencie clientes  
* Controle profissionais  
* Ofereça agendamento online  
* Acompanhe métricas  
* Tenha visão do dia a dia da operação

É uma solução desenhada para ser simples, moderna e escalável, com foco em velocidade e experiência.

### **1.2. Quem usa**

* **Dono (Administrador):** Controla tudo: empresa, unidades, equipe, agenda, serviços, preços, faturamento.  
* **Profissional (Staff):** Só vê sua própria agenda. Registra atendimentos, pagamentos e cancelamentos.  
* **Cliente Final:** Agenda via link público /book/:slug, e acompanha histórico no /client.

### **1.3. Problemas que resolve**

**Para o Dono:**

* Falta de controle do negócio  
* Agenda no WhatsApp  
* Overbooking  
* Zero visibilidade financeira

**Para o Profissional:**

* Agenda confusa  
* Dependência do dono para saber horários  
* Falta de histórico e indicadores

**Para o Cliente:**

* Dificuldade para agendar  
* Desconfiança sobre horários  
* Comunicação ineficiente

### **1.4. Diferenciais do TeAgendei**

* Multi-tenant real (empresa \> unidade \> profissional)  
* Engine de agendamento inteligente  
* Interface limpa e responsiva  
* Rápido onboarding  
* Link público para agendamento por loja  
* Estrutura robusta com PocketBase \+ React  
* Nunca há overbooking  
* Tudo sincronizado em tempo real

## **2\. VISÃO ESTRATÉGICA DO SAAS**

O TeAgendei nasce como uma solução para barbearias, mas sua arquitetura permite suportar:

* Clínicas médicas  
* Estúdios de tatuagem  
* Consultorias  
* Nail studios  
* Pet shops de banho e tosa

O sistema é segmentável, graças à coleção segments no PocketBase.

## **3\. ARQUITETURA DO SISTEMA (Visão Macro)**

**Fluxo:** CLIENTE → React SPA → API (PocketBase) → SQLite Database

### **Tecnologias principais**

* React 19  
* TypeScript  
* Vite  
* Tailwind  
* React Router v6  
* PocketBase (backend e banco)  
* Context API

### **3.1. Por que PocketBase?**

* Backend completo sem necessidade de Node.js  
* Autenticação robusta  
* Alta performance  
* Simplicidade  
* Regras de acesso integradas  
* Banco SQLite com segurança  
* Consultas rápidas  
* Realtime

### **3.2. Multi-tenant explicado**

Cada usuário pertence a uma empresa (company) e opcionalmente a uma unidade (shop).

**Estrutura:**

Company  
 └── Shops  
       ├── Services  
       ├── Staff  
       └── Appointments

**Regras no PocketBase garantem que:**

* O dono só vê dados da própria empresa  
* Staff só vê dados da própria loja  
* Cliente só vê seus próprios agendamentos

## **4\. MODELO DE DADOS — EXPLICAÇÃO HUMANIZADA**

Os dados são organizados em coleções:

| Coleção | Função |
| :---- | :---- |
| users | Dono, cliente e staff |
| companies | Empresa (CNPJ, razão social, plano) |
| shops | Unidade da empresa |
| shop\_hours | Horário de funcionamento |
| services | Serviços ofertados |
| appointments | Agendamentos |
| categories | Categorias de serviços |
| payment\_methods | Formas de pagamento |
| segments | Segmentos (ex: barbearia) |

**Exemplo de fluxo narrativo:**

1. O dono cria a empresa.  
2. Cria a primeira unidade (shop).  
3. Define horário de funcionamento.  
4. Registra profissionais.  
5. Cliente acessa /book/:slug.  
6. Faz agendamento.  
7. Profissional vê agenda do dia.  
8. Dono vê métricas no dashboard.

## **5\. FLUXOS DO SISTEMA (HÍBRIDO)**

Vamos agora narrar cada fluxo de maneira prática e técnica.

### **5.1. Fluxo de Onboarding do Dono**

Quando o dono entra pela primeira vez:

1. **Passo 1 — Dados da Empresa:** Nome da empresa, CNPJ (opcional), Segmento (opcional).  
2. **Passo 2 — Criar Loja:** Nome da unidade, Slug (URL pública), Telefone, Endereço.  
3. **Passo 3 — Horário de Funcionamento:** Define funcionamento de segunda à sábado.  
4. **Resultado final:** Dono é redirecionado para o Dashboard.

### **5.2. Fluxo de Agendamento (Cliente)**

Acessa: /book/:slug

1. Passo 1 → Escolhe serviço  
2. Passo 2 → Escolhe profissional  
3. Passo 3 → Escolhe data  
4. Passo 4 → Escolhe horário (engine calcula slots)  
5. Passo 5 → Confirma nome/telefone  
6. Sistema cria appointment

### **5.3. Fluxo do Profissional**

Acessa /app/staff/agenda.

* Vê sua agenda do dia  
* Marca como concluído  
* Marca paciente como pago  
* Cancela quando necessário  
* *Simples, direto, funcional.*

### **5.4. Fluxo do Cliente Autenticado**

Acessa /client.

* Vê próximos agendamentos  
* Cancela se faltar mais de 2h  
* Vê histórico completo

### **5.5. Fluxo do Dono no Dashboard**

Mostra:

* Agendamentos do dia  
* Faturamento do dia  
* Ocupação  
* Próximos atendimentos  
* Atalhos para serviços, equipe, configurações

## **6\. ENGINE DE BOOKING — NÚCLEO DO SISTEMA**

Ela calcula:

* horários válidos  
* horários bloqueados  
* fusos horários  
* duração dos serviços  
* min/max advance time  
* disponibilidade do profissional  
* horários de funcionamento da loja  
* conflitos com agendamentos existentes

Exemplo:  
Se o serviço dura 30 min, e a loja funciona das 9h às 18h:  
**Slots possíveis (local):**

* 09:00  
* 09:05  
* 09:10  
* …  
* 17:30  
* 17:35

**Depois aplicamos:**

* bloqueio por agendamento  
* bloqueio por antecedência mínima  
* bloqueio por antecedência máxima

## **7\. ARQUITETURA FRONTEND (EXPLICADA)**

src/  
  react-app/  
    contexts/          \# Auth \+ Tenant  
    lib/api/           \# Comunicação PocketBase  
    components/        \# UI e Booking  
    pages/             \# Telas principais  
    routes/            \# Router \+ ProtectedRoute  
    App.tsx  
  shared/  
    types.ts  
    utils/  
      date.ts  
      booking.ts

## **✅ ESTRUTURA FINAL DO TEAGENDEI (PASTA POR PASTA, ARQUIVO POR ARQUIVO)**

**Versão Oficial v2.1**

**IMPORTANTE:** Essa é a árvore exata que criaremos até o final das FASES 4–9. Nada fora disso será criado. Tudo estará documentado antes de codar.

### **📂 /src**

src/  
  react-app/  
  shared/

### **📂 1\. /src/react-app**

react-app/  
  App.tsx  
  main.tsx  
  routes/  
    AppRouter.tsx  
    ProtectedRoute.tsx  
  contexts/  
    AuthContext.tsx  
    TenantContext.tsx  
  lib/  
    api/  
      pocketbase.ts  
      auth.ts  
      companies.ts  
      shops.ts  
      services.ts  
      appointments.ts  
      customers.ts  
    utils/  
      date.ts  
      booking.ts  
      format.ts  
  components/  
    layout/  
      AppLayout.tsx  
      Sidebar.tsx  
      Header.tsx  
    booking/  
      StepService.tsx  
      StepProfessional.tsx  
      StepDateTime.tsx  
      StepConfirm.tsx  
    common/  
      Button.tsx  
      Input.tsx  
      Select.tsx  
      Modal.tsx  
      Card.tsx  
  pages/  
    auth/  
      LoginPage.tsx  
    onboarding/  
      OnboardingPage.tsx  
    owner/  
      DashboardPage.tsx  
      ShopsPage.tsx  
      NewShopPage.tsx  
      ServicesPage.tsx  
      StaffPage.tsx  
      SettingsPage.tsx  
    staff/  
      StaffAgendaPage.tsx  
    booking/  
      BookPage.tsx  
    client/  
      ClientPanelPage.tsx

### **📂 2\. /src/shared**

shared/  
  types.ts  
  utils/  
    validation.ts  
    masks.ts

### **🧪 Validação prática — Contagem total de arquivos**

Para garantir precisão:

| Área | Qtd arquivos |
| :---- | :---- |
| react-app/ | 33 |
| shared/ | 3 |
| **TOTAL DO PROJETO** | **36 arquivos** |

Isso significa que a árvore final SEMPRE terá 36 arquivos, exceto se futuramente adicionarmos testes, documentação ou assets.

## **🧬 CLASSIFICAÇÃO DOS ARQUIVOS POR FUNÇÃO**

### **✅ 1\. Raiz de aplicação (2 arquivos)**

* App.tsx  
* main.tsx

### **✅ 2\. Roteamento (2 arquivos)**

* AppRouter.tsx  
* ProtectedRoute.tsx

### **✅ 3\. Contextos (2 arquivos)**

* AuthContext.tsx  
* TenantContext.tsx

### **✅ 4\. API PocketBase (7 arquivos)**

* pocketbase.ts  
* auth.ts  
* companies.ts  
* shops.ts  
* services.ts  
* appointments.ts  
* customers.ts

### **✅ 5\. Utils (3 arquivos)**

* date.ts  
* booking.ts  
* format.ts

### **✅ 6\. Componentes de UI (8 arquivos)**

* Button, Input, Select, Modal, Card  
* Sidebar, Header, AppLayout

### **✅ 7\. Booking Steps (4 arquivos)**

* StepService  
* StepProfessional  
* StepDateTime  
* StepConfirm

### **✅ 8\. Páginas (12 arquivos)**

* **Auth:** LoginPage  
* **Onboarding:** OnboardingPage  
* **Owner:** DashboardPage, ShopsPage, NewShopPage, ServicesPage, StaffPage, SettingsPage  
* **Staff:** StaffAgendaPage  
* **Booking:** BookPage  
* **Client:** ClientPanelPage

### **✅ 9\. Shared (3 arquivos)**

* types.ts  
* validation.ts  
* masks.ts

*Pilares:*

* **Contexts** centralizam estado  
* **API** centraliza chamadas ao PB  
* **Pages** integram tudo  
* **Components** compõem interface

## **8\. API DO FRONTEND — CONTRATOS**

* **auth.ts:** login, logout, getCurrentUser  
* **shops.ts:** listOwnerShops, getShopBySlug, createShop  
* **services.ts:** getServicesByShop, createService  
* **appointments.ts:** createAppointment, listAppointmentsByProfessional, listAppointmentsByClient  
* **clients.ts:** getClientAppointments

## **9\. PÁGINAS PRINCIPAIS — UX \+ TÉC.**

### **9.1. LoginPage**

Simples, clara, eficiente.

### **9.2. Onboarding pages**

Wizard de 3 etapas.

### **9.3. DashboardPage**

KPIs \+ tabela do dia.

### **9.4. BookPage**

Fluxo de 4 passos com engine real.

### **9.5. ClientPanelPage**

Próximos \+ histórico.

### **9.6. StaffAgendaPage**

Operação do dia a dia.

## **10\. DEPLOY & BUILD — DOCUMENTAÇÃO FINAL**

### **Frontend**

* Vite → build → Cloudflare Pages  
* Variável ENV: VITE\_POCKETBASE\_URL

### **Backend (PB)**

* Rodando em VPS: pocketbase serve \--http=0.0.0.0:8090  
* Proxy reverso (Caddy):  
  api.teagendei.com {  
    reverse\_proxy 127.0.0.1:8090  
  }

* Backups diários  
* HTTPS automático

## **11\. ROADMAP OFICIAL**

**Faixa completa:**

1. **Fase 0** — Resumo Técnico  
2. **Fase 1** — Arquitetura Geral  
3. **Fase 2** — Tipos TS  
4. **Fase 3** — Estrutura Final  
5. **Fase 4** — Contexts  
6. **Fase 5** — API PocketBase  
7. **Fase 6** — Booking Engine  
8. **Fase 7** — Páginas completas  
9. **Fase 8** — Deploy  
10. **Fase 9** — Entrega Final (vFinal.md)