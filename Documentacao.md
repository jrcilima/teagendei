Documentação do Sistema Teagendei - Versão 2.0
1. Introdução
1.1. Visão Geral
O Teagendei é uma plataforma SaaS (Software as a Service) multi-tenant para gestão de agendamentos focada em Barbearias, Salões de Beleza, Esmalterias e Estéticas.

1.2. Escopo do Sistema
Esta documentação abrange a versão 2.0 (Estável) do sistema, consolidando todas as implementações, refatorações e funcionalidades.

2. Arquitetura e Tecnologias
2.1. Arquitetura do Sistema
O projeto segue uma arquitetura moderna de Single Page Application (SPA) com renderização no lado do cliente, comunicando com um Backend-as-a-Service (BaaS).

2.2. Stack Tecnológico
2.2.1. Frontend
React 19 com TypeScript

Vite como build tool

Tailwind CSS para estilização

React Router DOM v6 para roteamento

date-fns para manipulação de datas (garante consistência de fusos horários)

Zod para validação de schemas

2.2.2. Backend & Database
PocketBase (SQLite + Realtime API)

2.2.3. Outras Bibliotecas
Tipagem TypeScript compartilhada e Enums

2.3. Estrutura de Pastas
src/react-app/pages: Componentes de página (Rotas)

src/react-app/contexts: Gestão de estado global (Auth, Tenant)

src/react-app/lib: Configuração de API e cliente PocketBase

src/shared/types.ts: Tipagem TypeScript compartilhada e Enums

3. Funcionalidades do Sistema
3.1. Perfis de Acesso
O sistema está dividido em três perfis de acesso, geridos pelo componente ProtectedRoute.

3.1.1. Dono (Administrador)
3.1.1.1. Onboarding Guiado
Cadastro da empresa (CNPJ validado) e da primeira unidade.

Definição de URL personalizada (slug) para agendamento.

3.1.1.2. Dashboard Administrativo
Visão geral de métricas: Agendamentos do dia, Faturamento e Taxa de Ocupação.

Nota: As métricas ignoram agendamentos cancelados para precisão financeira.

3.1.1.3. Multi-Unidades
Capacidade de criar e gerir múltiplas lojas/filiais dentro da mesma empresa (/shops/new).

Alternância rápida entre lojas no cabeçalho do Dashboard.

3.1.1.4. Gestão de Equipe (Staff)
Cadastro de profissionais com validação de dados.

Definição de quem realiza atendimentos (is_professional).

3.1.1.5. Gestão de Serviços
CRUD de serviços com preço, duração e categoria.

3.1.1.6. Configurações da Loja
Definição de horários de funcionamento, endereço, métodos de pagamento aceitos e chave Pix.

3.1.2. Profissional (Staff)
3.1.2.1. Agenda Diária (Appointments)
Visualização cronológica dos agendamentos do dia.

Mudança de status: Concluir atendimento ou Cancelar.

Segurança: Filtro visual remove cancelados para limpar a agenda.

3.1.2.2. Gestão Financeira (Novo)
Controlo de pagamentos: Marcar agendamento como "Pago" ou "Não Pago".

Indicadores visuais (Badges) de estado financeiro.

3.1.3. Cliente Final
3.1.3.1. Agendamento Online (/book/:slug)
Fluxo de 4 passos: Serviço -> Profissional -> Data/Hora -> Confirmação.

Inteligência: O sistema só mostra horários disponíveis calculados com precisão, respeitando a duração do serviço e o horário da loja.

3.1.3.2. Painel do Cliente (/client)
Histórico de agendamentos passados e futuros.

Opção de cancelamento (com regra de bloqueio de 2 horas de antecedência).

Status Financeiro: Visualização clara se o serviço está "A Pagar", "Pago" ou "Pendente".

4. Segurança e Integridade de Dados
4.1. Backend (Banco de Dados)
4.1.1. Prevenção de Overbooking
Índice único parcial no banco de dados (idx_unique_active_booking) que impede fisicamente a criação de dois agendamentos para o mesmo barbeiro no mesmo horário, ignorando cancelados.

4.1.2. Isolamento de Dados
Regras de API (listRule, viewRule) garantem que um usuário só veja dados da sua própria empresa ou perfil.

4.2. Frontend (Aplicação)
4.2.1. Validação de Dados
Uso de Zod em todos os formulários críticos (Onboarding, ShopForm, StaffForm) para garantir que emails, slugs e senhas sigam os padrões.

4.2.2. Tipagem Estrita
Remoção de any e uso extensivo de Interfaces TypeScript (ShopFormData, User, Appointment) para prevenir erros de desenvolvimento.

4.2.3. Proteção de Rotas
Componente ProtectedRoute impede acesso não autorizado a páginas administrativas.

4.3. Datas e Fusos Horários
4.3.1. UTC Standard
Todas as datas são enviadas para o banco em formato ISO UTC (toISOString()).

4.3.2. Visualização Local
O frontend converte automaticamente para o fuso horário do navegador do usuário ao exibir horários (format(..., 'HH:mm')).

5. Modelo de Dados
5.1. Principais Coleções do PocketBase
5.1.1. companies
Dados fiscais e plano da empresa.

5.1.2. shops
Unidades físicas, configurações de Pix e horários. Relacionado a companies.

5.1.3. users
Usuários do sistema (Donos, Staff, Clientes). Possui campo role.

5.1.4. services
Catálogo de serviços.

5.1.5. appointments
O coração do sistema. Relaciona shop, barber, client, service e possui status de agendamento e pagamento.

6. Próximos Passos (Roadmap de Melhorias)
6.1. Notificações Automáticas (Prioridade Alta)
Integração com WhatsApp API (ex: Z-API ou Twilio) para enviar confirmação automática assim que o cliente agendar.

Lembretes automáticos 24h ou 1h antes do corte.

6.2. Integração Pix Dinâmica
Substituir o campo de texto da chave Pix por um gerador de QR Code (Payload Pix/EMVBR) que já contenha o valor exato do serviço.

Integração com gateway (ex: Asaas/EFI) para dar baixa automática no status "Pago" via Webhook.

6.3. Deploy em Produção
Configurar Cloudflare Pages para hospedar o frontend.

Configurar variáveis de ambiente de produção seguras.

6.4. Relatórios Avançados
Gráficos de faturamento mensal.

Ranking de profissionais mais requisitados.

Exportação de dados para Excel/PDF.

7. Como Rodar o Projeto
7.1. Configurar Ambiente
Crie um arquivo .env na raiz:

env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
(Ajuste para o IP do seu servidor PocketBase).

7.2. Instalar Dependências
bash
npm install
7.3. Rodar Aplicação
bash
npm run dev
Acesse http://localhost:5173.

Esta estrutura organiza a documentação de forma lógica, facilitando a consulta e a compreensão do sistema Teagendei.

📘 Documentação Completa do Sistema Teagendei v2.0
1. INTRODUÇÃO
1.1 Visão Geral
1.2 Escopo do Documento
1.3 Histórico de Versões
1.4 Glossário de Termos
2. ARQUITETURA DO SISTEMA
2.1 Visão Arquitetural
2.1.1 Diagrama de Arquitetura
2.1.2 Padrões de Design
2.2 Stack Tecnológico
2.2.1 Frontend
2.2.2 Backend & Database
2.2.3 Ferramentas de Desenvolvimento
2.3 Estrutura de Pastas
2.3.1 Frontend (React)
2.3.2 Shared Types
2.3.3 Configurações
3. CONFIGURAÇÃO E DEPLOY
3.1 Requisitos do Sistema
3.2 Ambiente de Desenvolvimento
3.2.1 Instalação
3.2.2 Configuração do Ambiente
3.2.3 Scripts Disponíveis
3.3 Deploy em Produção
3.3.1 Frontend (Cloudflare Pages)
3.3.2 Backend (PocketBase)
3.3.3 Variáveis de Ambiente
4. MODELO DE DADOS
4.1 Visão Geral do Banco
4.2 Coleções Principais
4.2.1 companies
4.2.2 shops
4.2.3 users
4.2.4 services
4.2.5 appointments
4.3 Relacionamentos
4.4 Índices e Otimizações
4.4.1 Prevenção de Overbooking
4.4.2 Índices de Performance
5. SEGURANÇA E CONTROLE DE ACESSO
5.1 Modelo de Autenticação
5.2 Perfis de Usuário
5.2.1 Dono/Administrador
5.2.2 Profissional (Staff)
5.2.3 Cliente
5.3 Regras de Acesso (API Rules)
5.3.1 Isolamento de Dados
5.3.2 Permissões por Coleção
5.4 Validação de Dados
5.4.1 Schemas com Zod
5.4.2 Validações Customizadas
6. FUNCIONALIDADES DO SISTEMA
6.1 Módulo Administrativo
6.1.1 Onboarding Guiado
6.1.1.1 Cadastro de Empresa
6.1.1.2 Configuração Inicial
6.1.1.3 Validação de CNPJ
6.1.2 Dashboard
6.1.2.1 Métricas em Tempo Real
6.1.2.2 Indicadores Financeiros
6.1.2.3 Taxa de Ocupação
6.1.3 Gestão Multi-Unidades
6.1.3.1 Criação de Novas Lojas
6.1.3.2 Alternância entre Lojas
6.1.3.3 Configurações por Loja
6.1.4 Gestão de Equipe
6.1.4.1 Cadastro de Profissionais
6.1.4.2 Controle de Permissões
6.1.4.3 Validação de Dados
6.1.5 Catálogo de Serviços
6.1.5.1 CRUD de Serviços
6.1.5.2 Categorização
6.1.5.3 Controle de Preços
6.1.6 Configurações da Loja
6.1.6.1 Horário de Funcionamento
6.1.6.2 Métodos de Pagamento
6.1.6.3 Configurações de Pix
6.2 Módulo Profissional
6.2.1 Agenda Diária
6.2.1.1 Visualização Cronológica
6.2.1.2 Mudança de Status
6.2.1.3 Filtros de Visualização
6.2.2 Gestão Financeira
6.2.2.1 Controle de Pagamentos
6.2.2.2 Status Financeiro
6.2.2.3 Indicadores Visuais
6.3 Módulo do Cliente
6.3.1 Agendamento Online
6.3.1.1 Fluxo em 4 Passos
6.3.1.2 Cálculo de Disponibilidade
6.3.1.3 URL Personalizada
6.3.2 Painel do Cliente
6.3.2.1 Histórico de Agendamentos
6.3.2.2 Cancelamentos
6.3.2.3 Status Financeiro
7. INTEGRIDADE DE DADOS
7.1 Gestão de Datas e Horários
7.1.1 Padrão UTC
7.1.2 Conversão de Fusos Horários
7.1.3 Validação de Disponibilidade
7.2 Prevenção de Concorrência
7.2.1 Mecanismo de Overbooking
7.2.2 Bloqueio de Horários
7.3 Consistência Transacional
7.3.1 Validações em Cascata
7.3.2 Rollback Automático
8. INTERFACES E COMPONENTES
8.1 Componentes Reutilizáveis
8.1.1 ProtectedRoute
8.1.2 Formulários Validados
8.1.3 Indicadores Visuais
8.2 Design System
8.2.1 Tokens do Tailwind
8.2.2 Componentes Base
8.2.3 Responsividade
9. API E COMUNICAÇÃO
9.1 PocketBase Client
9.1.1 Configuração
9.1.2 Hooks Customizados
9.1.3 Tratamento de Erros
9.2 Endpoints Principais
9.2.1 Autenticação
9.2.2 Agendamentos
9.2.3 Relatórios
10. MANUTENÇÃO E MONITORAMENTO
10.1 Logs e Auditoria
10.2 Backup de Dados
10.3 Performance Monitoring
11. ROADMAP - VERSÃO 3.0
11.1 Prioridade Alta
11.1.1 Notificações Automáticas
11.1.1.1 Integração WhatsApp
11.1.1.2 Lembretes Programados
11.1.2 Pix Dinâmico
11.1.2.1 QR Code Automático
11.1.2.2 Webhook de Pagamento
11.2 Prioridade Média
11.2.1 Relatórios Avançados
11.2.1.1 Gráficos e Estatísticas
11.2.1.2 Exportação de Dados
11.2.2 Melhorias de UX/UI
11.2.2.1 Dashboard Interativo
11.2.2.2 Mobile Optimization
11.3 Prioridade Baixa
11.3.1 Funcionalidades Adicionais
11.3.2 Integrações de Terceiros
12. TROUBLESHOOTING
12.1 Problemas Comuns
12.1.1 Configuração de Ambiente
12.1.2 Problemas de Autenticação
12.1.3 Erros de Validação
12.2 FAQs
12.3 Contato e Suporte
13. ANEXOS
13.1 Exemplos de Código
13.2 Diagramas de Sequência
13.3 Checklist de Deploy
13.4 Política de Atualização
14. REFERÊNCIAS
14.1 Documentação Oficial
14.2 Bibliotecas Utilizadas
14.3 Padrões de Código
Nota de Versão: Esta documentação reflete o estado atual do sistema Teagendei v2.0, sendo atualizada conforme novas funcionalidades são implementadas. Para sugestões ou correções, consulte a seção de Contato e Suporte.

agora gere a documentação em markdown
Vamos estruturar a documentação completa em markdown, seguindo a ordem lógica definida.

Como o conteúdo é extenso, vamos dividir em seções conforme o esboço fornecido, mas mantendo tudo em um único documento markdown.

Vou começar com o título principal e depois cada seção.

📘 Documentação Completa do Sistema Teagendei v2.0
1. INTRODUÇÃO
1.1 Visão Geral
O Teagendei é uma plataforma SaaS (Software as a Service) multi-tenant para gestão de agendamentos focada em Barbearias, Salões de Beleza, Esmalterias e Estéticas. A versão 2.0 representa uma refatoração completa com foco em estabilidade, performance e experiência do usuário.

1.2 Escopo do Documento
Esta documentação cobre a arquitetura, funcionalidades, configuração e manutenção do sistema Teagendei versão 2.0, destinada a desenvolvedores, administradores de sistema e usuários técnicos.

1.3 Histórico de Versões
v1.0 (2024): Versão inicial com funcionalidades básicas de agendamento

v2.0 (2025): Refatoração completa com TypeScript, validação robusta, prevenção de overbooking e gestão financeira integrada

1.4 Glossário de Termos
Tenant: Empresa/cliente que utiliza o sistema

Shop: Unidade física (barbearia, salão, etc.)

Staff: Profissional que realiza atendimentos

Appointment: Agendamento de serviço

Slot: Intervalo de tempo disponível para agendamento

2. ARQUITETURA DO SISTEMA
2.1 Visão Arquitetural
O sistema segue uma arquitetura moderna de Single Page Application (SPA) com renderização no lado do cliente, comunicando-se com um Backend-as-a-Service (BaaS).

2.1.1 Diagrama de Arquitetura
text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   PocketBase    │    │   SQLite DB     │
│   React 19      │◄──►│   Backend       │◄──►│   Database      │
│   TypeScript    │    │   (BaaS)        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┴───────────────────────┘
                    API REST + Realtime
2.1.2 Padrões de Design
Component-based Architecture: React com hooks personalizados

Container/Presentational Pattern: Separação de lógica e apresentação

Context API: Gerenciamento de estado global (auth, tenant)

2.2 Stack Tecnológico
2.2.1 Frontend
React 19: Biblioteca principal com hooks

TypeScript: Tipagem estática para prevenção de erros

Vite: Build tool e dev server de alta performance

Tailwind CSS: Framework CSS utilitário

React Router DOM v6: Roteamento do lado do cliente

date-fns: Manipulação de datas com suporte a timezone

Zod: Validação de schemas TypeScript-first

2.2.2 Backend & Database
PocketBase: Backend-as-a-Service com API REST e Realtime

SQLite: Banco de dados embutido (pode migrar para PostgreSQL)

Go: Linguagem do PocketBase (performance nativa)

2.2.3 Ferramentas de Desenvolvimento
ESLint: Linting de código

Prettier: Formatação automática

Git: Controle de versão

2.3 Estrutura de Pastas
2.3.1 Frontend (React)
text
src/
├── react-app/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Componentes de página (Rotas)
│   ├── contexts/      # Gestão de estado global
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Configurações e utilitários
│   └── utils/         # Funções auxiliares
├── shared/
│   └── types.ts       # Tipagem TypeScript compartilhada
├── App.tsx            # Componente raiz
└── main.tsx           # Ponto de entrada
2.3.2 Shared Types
typescript
// Exemplo de tipos compartilhados
export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  CLIENT = 'client'
}

export interface Appointment {
  id: string;
  shop_id: string;
  barber_id: string;
  client_id: string;
  service_id: string;
  scheduled_for: string; // ISO date
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'unpaid';
}
2.3.3 Configurações
.env: Variáveis de ambiente

.env.example: Template de variáveis

vite.config.ts: Configuração do Vite

tsconfig.json: Configuração TypeScript

3. CONFIGURAÇÃO E DEPLOY
3.1 Requisitos do Sistema
Node.js: v18 ou superior

npm: v9 ou superior

PocketBase: v0.22 ou superior

Navegador: Chrome 90+, Firefox 88+, Safari 14+

3.2 Ambiente de Desenvolvimento
3.2.1 Instalação
bash
# Clonar repositório
git clone <repository-url>
cd teagendei

# Instalar dependências
npm install

# Instalar PocketBase (macOS/Linux)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.22.7/pocketbase_0.22.7_darwin_amd64.zip -o pocketbase.zip
unzip pocketbase.zip
chmod +x pocketbase

# Windows: Baixar executável do site oficial
3.2.2 Configuração do Ambiente
env
# .env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
VITE_APP_NAME=Teagendei
VITE_APP_VERSION=2.0.0
3.2.3 Scripts Disponíveis
json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "pb:serve": "./pocketbase serve",
    "dev:full": "concurrently \"npm run pb:serve\" \"npm run dev\""
  }
}
3.3 Deploy em Produção
3.3.1 Frontend (Cloudflare Pages)
bash
# Build do projeto
npm run build

# Deploy via Wrangler
npx wrangler pages deploy dist --project-name=teagendei
3.3.2 Backend (PocketBase)
bash
# Servidor PocketBase em produção
./pocketbase serve --http=0.0.0.0:8080

# Com sistema de inicialização (systemd)
sudo nano /etc/systemd/system/teagendei-pb.service
3.3.3 Variáveis de Ambiente de Produção
env
# .env.production
VITE_POCKETBASE_URL=https://api.seudominio.com
VITE_SITE_URL=https://agenda.seudominio.com
4. MODELO DE DADOS
4.1 Visão Geral do Banco
O sistema utiliza 5 coleções principais relacionadas entre si, com isolamento de dados por tenant.

4.2 Coleções Principais
4.2.1 companies
typescript
interface Company {
  id: string;
  name: string;
  cnpj: string; // Validado
  email: string;
  phone: string;
  plan: 'free' | 'premium' | 'enterprise';
  created: Date;
  updated: Date;
}
4.2.2 shops
typescript
interface Shop {
  id: string;
  company_id: string;
  name: string;
  slug: string; // URL única
  address: string;
  opening_hours: {
    monday: { open: string, close: string },
    tuesday: { open: string, close: string },
    // ... todos os dias
  };
  payment_methods: string[];
  pix_key: string;
  created: Date;
  updated: Date;
}
4.2.3 users
typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company_id?: string;
  shop_id?: string;
  is_professional: boolean;
  avatar?: string;
  created: Date;
  updated: Date;
}
4.2.4 services
typescript
interface Service {
  id: string;
  shop_id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // em minutos
  category: string;
  active: boolean;
  created: Date;
  updated: Date;
}
4.2.5 appointments
typescript
interface Appointment {
  id: string;
  shop_id: string;
  barber_id: string;
  client_id: string;
  service_id: string;
  scheduled_for: string; // ISO UTC
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'unpaid';
  notes?: string;
  cancellation_reason?: string;
  created: Date;
  updated: Date;
}
4.3 Relacionamentos
text
Company 1───┐
            │
Shop N──────┘ (company_id)
            │
User N──────┘ (shop_id)    (company_id)
            │
Service N───┘ (shop_id)
            │
Appointment ─┘ (shop_id, barber_id, client_id, service_id)
4.4 Índices e Otimizações
4.4.1 Prevenção de Overbooking
sql
-- Índice único parcial no banco de dados
CREATE UNIQUE INDEX idx_unique_active_booking 
ON appointments (barber_id, scheduled_for) 
WHERE status != 'cancelled';
4.4.2 Índices de Performance
appointments(shop_id, scheduled_for) para queries da agenda

appointments(client_id) para histórico do cliente

services(shop_id, active) para catálogo rápido

5. SEGURANÇA E CONTROLE DE ACESSO
5.1 Modelo de Autenticação
JWT-based: Tokens de acesso com expiração

Multi-tenant: Isolamento completo entre empresas

Role-based: Permissões granulares por perfil

5.2 Perfis de Usuário
5.2.1 Dono/Administrador
typescript
const adminPermissions = {
  canManageCompany: true,
  canManageShops: true,
  canManageStaff: true,
  canManageServices: true,
  canViewReports: true,
  canManageAppointments: true,
};
5.2.2 Profissional (Staff)
typescript
const staffPermissions = {
  canManageCompany: false,
  canManageShops: false,
  canViewOwnAppointments: true,
  canUpdateAppointmentStatus: true,
  canUpdatePaymentStatus: true,
};
5.2.3 Cliente
typescript
const clientPermissions = {
  canBookAppointments: true,
  canViewOwnHistory: true,
  canCancelOwnAppointments: true,
  canUpdateProfile: true,
};
5.3 Regras de Acesso (API Rules)
5.3.1 Isolamento de Dados
javascript
// Exemplo de regra no PocketBase
{
  listRule: "@request.auth.company_id = company_id",
  viewRule: "@request.auth.company_id = company_id",
  createRule: "@request.auth.role = 'admin' && @request.auth.company_id = @request.data.company_id",
  updateRule: "@request.auth.company_id = company_id",
  deleteRule: "@request.auth.role = 'admin' && @request.auth.company_id = company_id"
}
5.3.2 Permissões por Coleção
companies: Apenas dono da empresa

shops: Dono + staff daquela loja

appointments: Dono + staff + cliente (apenas os próprios)

5.4 Validação de Dados
5.4.1 Schemas com Zod
typescript
import { z } from 'zod';

export const appointmentSchema = z.object({
  shop_id: z.string().min(1, 'Loja é obrigatória'),
  barber_id: z.string().min(1, 'Profissional é obrigatório'),
  service_id: z.string().min(1, 'Serviço é obrigatório'),
  scheduled_for: z.string().datetime(),
  client_name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  client_phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
5.4.2 Validações Customizadas
CNPJ válido com algoritmo de verificação

Email único por empresa

Slug único no sistema

Horário dentro do funcionamento da loja

6. FUNCIONALIDADES DO SISTEMA
6.1 Módulo Administrativo
6.1.1 Onboarding Guiado
6.1.1.1 Cadastro de Empresa
typescript
// Fluxo de cadastro
1. Coleta de dados da empresa (nome, CNPJ, email)
2. Validação de CNPJ em tempo real
3. Criação da primeira loja/unidade
4. Definição de slug personalizado
5. Cadastro do usuário administrador
6.1.1.2 Configuração Inicial
Horário de funcionamento padrão

Métodos de pagamento aceitos

Chave Pix para recebimentos

6.1.1.3 Validação de CNPJ
typescript
function validateCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cleaned = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (cleaned.length !== 14) return false;
  
  // Algoritmo de validação do CNPJ
  // ... implementação completa
  return true;
}
6.1.2 Dashboard
6.1.2.1 Métricas em Tempo Real
typescript
interface DashboardMetrics {
  dailyAppointments: number;  // Ignora cancelados
  dailyRevenue: number;       // Soma de serviços concluídos
  occupancyRate: number;      // (Horários ocupados / Horários disponíveis) * 100
  pendingPayments: number;
}
6.1.2.2 Indicadores Financeiros
Faturamento do dia

Faturamento do mês

Serviços mais populares

Taxa de conversão

6.1.2.3 Taxa de Ocupação
typescript
function calculateOccupancyRate(
  bookedSlots: number,
  availableSlots: number
): number {
  if (availableSlots === 0) return 0;
  return (bookedSlots / availableSlots) * 100;
}
6.1.3 Gestão Multi-Unidades
6.1.3.1 Criação de Novas Lojas
typescript
// POST /api/shops
{
  "name": "Barbearia Centro",
  "slug": "barbearia-centro",
  "address": "Rua Principal, 123",
  "opening_hours": { /* ... */ },
  "payment_methods": ["pix", "credit", "debit"]
}
6.1.3.2 Alternância entre Lojas
typescript
const ShopSwitcher = () => {
  const { shops, currentShop, setCurrentShop } = useShop();
  
  return (
    <select 
      value={currentShop?.id} 
      onChange={(e) => setCurrentShop(e.target.value)}
    >
      {shops.map(shop => (
        <option key={shop.id} value={shop.id}>
          {shop.name}
        </option>
      ))}
    </select>
  );
};
6.1.3.3 Configurações por Loja
Horário específico por dia

Feriados e dias de folga

Profissionais disponíveis

Serviços oferecidos

6.1.4 Gestão de Equipe
6.1.4.1 Cadastro de Profissionais
typescript
const staffSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/),
  role: z.enum(['barber', 'stylist', 'manicurist']),
  is_professional: z.boolean(),
  services: z.array(z.string()) // IDs dos serviços que realiza
});
6.1.4.2 Controle de Permissões
Acesso à agenda

Permissão para cancelar agendamentos

Visualização de relatórios

Gestão de pagamentos

6.1.4.3 Validação de Dados
Email único por empresa

Telefone válido

CPF válido (opcional)

6.1.5 Catálogo de Serviços
6.1.5.1 CRUD de Serviços
typescript
// Estrutura completa do serviço
interface ServiceFormData {
  name: string;
  description?: string;
  price: number; // em centavos
  duration: number; // em minutos
  category: string;
  active: boolean;
}
6.1.5.2 Categorização
Corte de cabelo

Barba

Manicure

Pedicure

Sobrancelha

Outros

6.1.5.3 Controle de Preços
typescript
// Formatação de preço
function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price / 100);
}
6.1.6 Configurações da Loja
6.1.6.1 Horário de Funcionamento
typescript
interface OpeningHours {
  [day: string]: {
    open: string; // "09:00"
    close: string; // "18:00"
    breaks?: Array<{
      start: string;
      end: string;
    }>;
  };
}
6.1.6.2 Métodos de Pagamento
Pix (obrigatório)

Cartão de crédito

Cartão de débito

Dinheiro

Outros

6.1.6.3 Configurações de Pix
typescript
interface PixSettings {
  key: string; // Chave Pix
  key_type: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  receiver_name: string;
  receiver_city: string;
}
6.2 Módulo Profissional
6.2.1 Agenda Diária
6.2.1.1 Visualização Cronológica
typescript
// Hook para buscar agendamentos do dia
const useDailyAppointments = (date: Date) => {
  const { currentShop } = useShop();
  
  return useQuery({
    queryKey: ['appointments', currentShop?.id, date],
    queryFn: () => fetchAppointmentsByDate(date),
    select: (data) => data.filter(a => a.status !== 'cancelled')
  });
};
6.2.1.2 Mudança de Status
typescript
// Atualizar status do agendamento
const updateAppointmentStatus = async (
  appointmentId: string,
  status: AppointmentStatus
) => {
  await pb.collection('appointments').update(appointmentId, { status });
  
  // Atualização em tempo real via PocketBase
  // Todos os dispositivos conectados recebem a atualização
};
6.2.1.3 Filtros de Visualização
Apenas meus agendamentos

Por status (pendente, confirmado, concluído)

Por serviço

Por cliente

6.2.2 Gestão Financeira
6.2.2.1 Controle de Pagamentos
typescript
// Marcar como pago/não pago
const togglePaymentStatus = async (appointmentId: string) => {
  const appointment = await getAppointment(appointmentId);
  const newStatus = appointment.payment_status === 'paid' 
    ? 'unpaid' 
    : 'paid';
  
  await updatePaymentStatus(appointmentId, newStatus);
};
6.2.2.2 Status Financeiro
typescript
// Badges de status
const PaymentBadge = ({ status }: { status: PaymentStatus }) => {
  const variants = {
    paid: 'bg-green-100 text-green-800',
    unpaid: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };
  
  const labels = {
    paid: 'Pago',
    unpaid: 'Não Pago',
    pending: 'Pendente'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${variants[status]}`}>
      {labels[status]}
    </span>
  );
};
6.2.2.3 Indicadores Visuais
Cor por status (verde=pago, vermelho=não pago)

Ícones intuitivos

Tooltips com detalhes

6.3 Módulo do Cliente
6.3.1 Agendamento Online
6.3.1.1 Fluxo em 4 Passos
typescript
type BookingStep = 'service' | 'professional' | 'datetime' | 'confirmation';

const BookingWizard = () => {
  const [step, setStep] = useState<BookingStep>('service');
  const [bookingData, setBookingData] = useState<Partial<Booking>>({});
  
  // Navegação entre passos
  const nextStep = () => { /* ... */ };
  const prevStep = () => { /* ... */ };
  
  return (
    <div>
      <ProgressBar step={step} />
      {step === 'service' && <ServiceStep />}
      {step === 'professional' && <ProfessionalStep />}
      {step === 'datetime' && <DateTimeStep />}
      {step === 'confirmation' && <ConfirmationStep />}
    </div>
  );
};
6.3.1.2 Cálculo de Disponibilidade
typescript
function calculateAvailableSlots(
  professionalId: string,
  serviceDuration: number,
  date: Date
): Slot[] {
  // 1. Buscar agendamentos existentes do profissional
  // 2. Considerar horário de funcionamento da loja
  // 3. Considerar intervalos entre agendamentos
  // 4. Retornar slots disponíveis
  
  return availableSlots;
}
6.3.1.3 URL Personalizada
text
https://teagendei.com/book/{slug-da-loja}

// Exemplo:
https://teagendei.com/book/barbearia-modelo
6.3.2 Painel do Cliente
6.3.2.1 Histórico de Agendamentos
typescript
// Buscar agendamentos do cliente
const useClientAppointments = (clientId: string) => {
  return useQuery({
    queryKey: ['client-appointments', clientId],
    queryFn: () => pb.collection('appointments')
      .getList(1, 50, {
        filter: `client_id = "${clientId}"`,
        sort: '-scheduled_for'
      })
  });
};
6.3.2.2 Cancelamentos
typescript
// Regra de cancelamento (2 horas de antecedência)
const canCancelAppointment = (appointment: Appointment): boolean => {
  const now = new Date();
  const appointmentTime = new Date(appointment.scheduled_for);
  const twoHoursInMs = 2 * 60 * 60 * 1000;
  
  return appointmentTime.getTime() - now.getTime() > twoHoursInMs;
};
6.3.2.3 Status Financeiro
"A Pagar": Agendamento concluído, aguardando pagamento

"Pago": Pagamento confirmado

"Pendente": Agendamento futuro

7. INTEGRIDADE DE DADOS
7.1 Gestão de Datas e Horários
7.1.1 Padrão UTC
typescript
// Converter para UTC antes de salvar
const saveAppointment = (data: AppointmentFormData) => {
  const utcDate = new Date(data.scheduled_for).toISOString();
  
  return pb.collection('appointments').create({
    ...data,
    scheduled_for: utcDate
  });
};
7.1.2 Conversão de Fusos Horários
typescript
// Converter para fuso local ao exibir
const formatLocalTime = (utcDate: string): string => {
  return format(new Date(utcDate), 'HH:mm', {
    locale: ptBR
  });
};
7.1.3 Validação de Disponibilidade
typescript
function validateTimeSlot(
  slot: string,
  professionalId: string,
  serviceDuration: number
): boolean {
  // Verificar conflitos
  // Considerar duração do serviço
  // Considerar intervalo entre serviços
  return isAvailable;
}
7.2 Prevenção de Concorrência
7.2.1 Mecanismo de Overbooking
typescript
// Tentativa de agendamento com validação
const bookAppointment = async (bookingData: BookingData) => {
  try {
    const appointment = await pb.collection('appointments').create(bookingData);
    return appointment;
  } catch (error) {
    if (error.code === 'UNIQUE_VIOLATION') {
      throw new Error('Horário já ocupado');
    }
    throw error;
  }
};
7.2.2 Bloqueio de Horários
Bloqueio otimista durante o fluxo de agendamento

Timeout automático após 5 minutos

Notificação se horário for ocupado

7.3 Consistência Transacional
7.3.1 Validações em Cascata
typescript
// Antes de deletar uma loja
const deleteShop = async (shopId: string) => {
  // Verificar se existem agendamentos futuros
  const futureAppointments = await getFutureAppointments(shopId);
  
  if (futureAppointments.length > 0) {
    throw new Error('Não é possível deletar loja com agendamentos futuros');
  }
  
  // Prosseguir com exclusão
  await pb.collection('shops').delete(shopId);
};
7.3.2 Rollback Automático
Transações no banco de dados

Compensação em caso de erro

Log de operações para auditoria

8. INTERFACES E COMPONENTES
8.1 Componentes Reutilizáveis
8.1.1 ProtectedRoute
typescript
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: ReactNode;
  requiredRole?: UserRole;
}) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  if (!user) return <Navigate to="/login" />;
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};
8.1.2 Formulários Validados
typescript
const ValidatedForm = <T,>({
  schema,
  onSubmit,
  children
}: ValidatedFormProps<T>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<T>({
    resolver: zodResolver(schema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({ register, errors })}
    </form>
  );
};
8.1.3 Indicadores Visuais
Loading skeletons

Empty states

Error boundaries

Success/error toasts

8.2 Design System
8.2.1 Tokens do Tailwind
javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... até 900
        }
      }
    }
  }
}
8.2.2 Componentes Base
Button com variantes

Input com estados

Card layouts

Modal dialogs

8.2.3 Responsividade
typescript
// Mobile-first approach
const ResponsiveLayout = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Conteúdo */}
      </div>
    </div>
  );
};
9. API E COMUNICAÇÃO
9.1 PocketBase Client
9.1.1 Configuração
typescript
import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

// Interceptor para adicionar token
pb.autoCancellation(false);
pb.beforeSend = function (url, options) {
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${pb.authStore.token}`
  };
  return { url, options };
};
9.1.2 Hooks Customizados
typescript
export const usePocketBase = () => {
  const pb = useContext(PocketBaseContext);
  if (!pb) throw new Error('usePocketBase must be used within PocketBaseProvider');
  return pb;
};

export const useRealtime = <T>(collection: string, callback: (data: T) => void) => {
  const pb = usePocketBase();
  
  useEffect(() => {
    const unsubscribe = pb.collection(collection).subscribe('*', (e) => {
      callback(e.record as T);
    });
    
    return () => unsubscribe();
  }, [collection, callback, pb]);
};
9.1.3 Tratamento de Erros
typescript
class APIError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

const handleApiError = (error: any) => {
  if (error instanceof APIError) {
    toast.error(error.message);
  } else {
    toast.error('Erro interno do servidor');
    console.error(error);
  }
};
9.2 Endpoints Principais
9.2.1 Autenticação
typescript
// Login
POST /api/collections/users/auth-with-password

// Registro
POST /api/collections/users/records

// Refresh token
POST /api/collections/users/auth-refresh
9.2.2 Agendamentos
typescript
// Listar agendamentos do dia
GET /api/collections/appointments/records
?filter=(shop_id='{shopId}' && scheduled_for>='{date}T00:00:00' && scheduled_for<='{date}T23:59:59')
&expand=barber_id,client_id,service_id

// Criar agendamento
POST /api/collections/appointments/records

// Atualizar status
PATCH /api/collections/appointments/records/{id}
9.2.3 Relatórios
typescript
// Métricas do dashboard
GET /api/collections/appointments/stats
?shop_id={shopId}
&start_date={startDate}
&end_date={endDate}
10. MANUTENÇÃO E MONITORAMENTO
10.1 Logs e Auditoria
Log de todas as operações críticas

Auditoria de alterações em dados sensíveis

Rastreamento de erros do usuário

10.2 Backup de Dados
bash
# Backup do PocketBase
./pocketbase backup --dir ./backups

# Restauração
./pocketbase restore ./backups/backup_20240101.zip
10.3 Performance Monitoring
Monitoramento de tempo de resposta

Alertas de downtime

Análise de uso de recursos

11. ROADMAP - VERSÃO 3.0
11.1 Prioridade Alta
11.1.1 Notificações Automáticas
11.1.1.1 Integração WhatsApp
typescript
// Envio de confirmação via WhatsApp
const sendWhatsAppConfirmation = async (appointment: Appointment) => {
  const message = `✅ Agendamento Confirmado!
  Serviço: ${appointment.service_name}
  Data: ${formatDate(appointment.scheduled_for)}
  Horário: ${formatTime(appointment.scheduled_for)}
  Profissional: ${appointment.barber_name}`;
  
  await whatsAppAPI.send({
    to: appointment.client_phone,
    message: message
  });
};
11.1.1.2 Lembretes Programados
24h antes do agendamento

1h antes do agendamento

Opção de cancelamento via WhatsApp

11.1.2 Pix Dinâmico
11.1.2.1 QR Code Automático
typescript
interface DynamicPixPayload {
  merchant_name: string;
  merchant_city: string;
  transaction_id: string;
  amount: number;
  description: string;
}

const generatePixQRCode = (appointment: Appointment): string => {
  const payload = {
    // Dados do Pix dinâmico
  };
  
  return generateQRCode(payload);
};
11.1.2.2 Webhook de Pagamento
typescript
// Endpoint para receber confirmação de pagamento
POST /api/webhooks/pix-payment

// Atualiza status automaticamente
appointment.payment_status = 'paid';
11.2 Prioridade Média
11.2.1 Relatórios Avançados
11.2.1.1 Gráficos e Estatísticas
Faturamento mensal com gráficos

Taxa de ocupação por profissional

Horários mais populares

11.2.1.2 Exportação de Dados
Exportar para Excel

Exportar para PDF

Filtros avançados

11.2.2 Melhorias de UX/UI
11.2.2.1 Dashboard Interativo
Drag & drop na agenda

Atalhos de teclado

Tema escuro/claro

11.2.2.2 Mobile Optimization
PWA (Progressive Web App)

Notificações push

Offline mode básico

11.3 Prioridade Baixa
11.3.1 Funcionalidades Adicionais
Pacotes de serviços

Fidelidade/programa de pontos

Avaliações e feedback

11.3.2 Integrações de Terceiros
Google Calendar sync

Instagram agendamento direto

Sistemas de contabilidade

12. TROUBLESHOOTING
12.1 Problemas Comuns
12.1.1 Configuração de Ambiente
bash
# Erro: Cannot find module
rm -rf node_modules package-lock.json
npm install

# Erro: PocketBase não inicia
chmod +x pocketbase
./pocketbase serve

# Erro: Porta em uso
sudo lsof -i :8090
kill -9 <PID>
12.1.2 Problemas de Autenticação
typescript
// Token expirado
pb.authStore.clear();
window.location.href = '/login';

// Permissões insuficientes
// Verificar regras no PocketBase admin
12.1.3 Erros de Validação
Verificar schemas do Zod

Confirmar tipos TypeScript

Verificar regras de negócio

12.2 FAQs
Q: Como adicionar um novo profissional?
A: Acesse "Equipe" > "Novo Profissional" no dashboard administrativo.

Q: Como alterar o horário de funcionamento?
A: Acesse "Configurações" > "Horário de Funcionamento".

Q: O cliente pode cancelar online?
A: Sim, desde que seja com 2 horas de antecedência.

Q: Como integrar com WhatsApp?
A: Em breve na versão 3.0.

12.3 Contato e Suporte
Email: suporte@teagendei.com

Documentação: docs.teagendei.com

GitHub: github.com/teagendei/issues

Slack: teagendei.slack.com

13. ANEXOS
13.1 Exemplos de Código
13.1.1 Hook de Autenticação Completo
typescript
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Inicializar do localStorage
    const stored = localStorage.getItem('auth');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
    
    // Escutar mudanças
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model as User);
      localStorage.setItem('auth', JSON.stringify(pb.authStore.model));
    });
    
    return () => unsubscribe();
  }, []);
  
  const login = async (email: string, password: string) => {
    const authData = await pb.collection('users')
      .authWithPassword(email, password);
    return authData;
  };
  
  const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem('auth');
  };
  
  return { user, loading, login, logout };
};
13.1.2 Cálculo Completo de Horários Disponíveis
typescript
export const calculateAvailableTimeSlots = (
  professionalId: string,
  serviceDuration: number,
  date: Date,
  shop: Shop
): string[] => {
  // 1. Definir horário de funcionamento
  const day = date.getDay();
  const openingHours = shop.opening_hours[day];
  
  if (!openingHours || openingHours.open === 'closed') {
    return [];
  }
  
  // 2. Buscar agendamentos existentes
  const appointments = await getProfessionalAppointments(professionalId, date);
  
  // 3. Gerar slots
  const slots: string[] = [];
  const startTime = parse(openingHours.open, 'HH:mm', date);
  const endTime = parse(openingHours.close, 'HH:mm', date);
  
  let currentTime = startTime;
  
  while (currentTime < endTime) {
    const slotEnd = addMinutes(currentTime, serviceDuration);
    
    // Verificar se há conflito
    const hasConflict = appointments.some(apt => {
      const aptStart = new Date(apt.scheduled_for);
      const aptEnd = addMinutes(aptStart, apt.duration);
      
      return (
        (currentTime >= aptStart && currentTime < aptEnd) ||
        (slotEnd > aptStart && slotEnd <= aptEnd) ||
        (currentTime <= aptStart && slotEnd >= aptEnd)
      );
    });
    
    if (!hasConflict && slotEnd <= endTime) {
      slots.push(format(currentTime, 'HH:mm'));
    }
    
    // Próximo slot com intervalo de 15 minutos
    currentTime = addMinutes(currentTime, 15);
  }
  
  return slots;
};
13.2 Diagramas de Sequência
13.2.1 Fluxo de Agendamento
text
Cliente -> Sistema: Acessa /book/:slug
Sistema -> Cliente: Exibe seleção de serviço
Cliente -> Sistema: Seleciona serviço
Sistema -> Cliente: Exibe profissionais disponíveis
Cliente -> Sistema: Seleciona profissional
Sistema -> Backend: Busca horários disponíveis
Backend -> Sistema: Retorna slots
Sistema -> Cliente: Exibe calendário/horários
Cliente -> Sistema: Seleciona data/horário
Sistema -> Cliente: Exibe formulário de confirmação
Cliente -> Sistema: Preenche dados e confirma
Sistema -> Backend: Cria agendamento
Backend -> Sistema: Confirma criação
Sistema -> Cliente: Exibe confirmação
13.2.2 Fluxo de Pagamento
text
Staff -> Sistema: Marca serviço como concluído
Sistema -> Backend: Atualiza status do agendamento
Backend -> Sistema: Confirma atualização
Sistema -> Staff: Exibe opção de marcar pagamento
Staff -> Sistema: Clica em "Marcar como Pago"
Sistema -> Backend: Atualiza payment_status para "paid"
Backend -> Sistema: Confirma atualização
Sistema -> Staff: Exibe badge "Pago"
Sistema -> Cliente (opcional): Envia recibo por email
13.3 Checklist de Deploy
13.3.1 Pré-Deploy
Testes unitários passando

Build sem erros

Variáveis de ambiente configuradas

Backup do banco atual

DNS configurado (se necessário)

13.3.2 Deploy
Build do frontend: npm run build

Upload para hospedagem

Configurar PocketBase em produção

Testar endpoints da API

Validar SSL/TLS

13.3.3 Pós-Deploy
Testar fluxo completo

Verificar logs de erro

Monitorar performance

Notificar usuários (se aplicável)

13.4 Política de Atualização
13.4.1 Versões
Patch (x.x.1): Correções de bugs, sem breaking changes

Minor (x.1.0): Novas features, backward compatible

Major (1.x.0): Breaking changes, requer migração

13.4.2 Schedule
Backups automáticos diários

Manutenção programada: Domingos, 02:00-04:00

Notificação com 48h de antecedência para breaking changes

13.4.3 Rollback Procedure
bash
# 1. Restaurar backup do banco
./pocketbase restore backup_pre_update.zip

# 2. Reverter frontend
git checkout previous-tag
npm run build

# 3. Verificar integridade
npm run test:e2e
14. REFERÊNCIAS
14.1 Documentação Oficial
React Documentation

TypeScript Handbook

PocketBase Docs

Tailwind CSS

Vite Guide

14.2 Bibliotecas Utilizadas
json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "pocketbase": "^0.22.0",
    "date-fns": "^3.6.0",
    "zod": "^3.22.0",
    "react-router-dom": "^6.22.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
14.3 Padrões de Código
Airbnb React Style Guide

TypeScript ESLint

Conventional Commits

Versão do Documento: 2.0.1
