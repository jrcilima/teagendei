# Teagendei - Plataforma SaaS Multissegmento

Sistema completo de gestão de agendamentos para Barbearias, Salões, Esmalterias e Estéticas.

## 🚀 Tecnologias

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Cloudflare Workers + Hono
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Deploy**: Cloudflare Pages

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Cloudflare (para deploy)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd teagendei
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações do banco de dados:
```bash
npm run wrangler d1 migrations apply <database-name> --local
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 📦 Estrutura do Projeto

```
teagendei/
├── src/
│   ├── react-app/           # Frontend React
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Context providers
│   │   ├── lib/            # Utilitários e API client
│   │   ├── pages/          # Páginas da aplicação
│   │   └── index.css       # Estilos globais
│   ├── shared/             # Tipos compartilhados
│   │   └── types.ts        # TypeScript types
│   └── worker/             # Backend Cloudflare Workers
│       ├── db/             # Database queries
│       ├── routes/         # API routes
│       ├── auth.ts         # Autenticação
│       └── index.ts        # Worker entry point
├── migrations/             # Database migrations
├── wrangler.json          # Cloudflare configuration
└── package.json
```

## 🗄️ Schema do Banco de Dados

O sistema utiliza as seguintes tabelas principais:

- **companies**: Empresas/tenants
- **segments**: Segmentos de negócio (Barbearia, Salão, etc)
- **shops**: Unidades/estabelecimentos
- **users**: Usuários (donos, staff, clientes)
- **services**: Catálogo de serviços
- **staff_services**: Vínculo profissional-serviço
- **appointments**: Agendamentos
- **blocked_slots**: Bloqueios de agenda
- **financial_transactions**: Transações financeiras
- **notifications**: Histórico de notificações

## 🎨 Funcionalidades Implementadas

### ✅ Core do Sistema
- [x] Autenticação de usuários (login/registro)
- [x] Sistema multi-tenant (isolamento por empresa)
- [x] Gestão de empresas e unidades
- [x] Cadastro de segmentos (Barbearia, Salão, Esmalteria, Estética)
- [x] CRUD de serviços
- [x] Dashboard administrativo
- [x] Onboarding guiado
- [x] Landing page marketing

### 🔄 Em Desenvolvimento
- [ ] Sistema de agendamentos completo
- [ ] Gestão de profissionais (staff)
- [ ] Área do cliente (PWA)
- [ ] Integração com pagamentos Pix
- [ ] Sistema de notificações (WhatsApp/Email)
- [ ] Relatórios e analytics
- [ ] Gestão de horários e disponibilidade
- [ ] Sistema de bloqueios de agenda

## 🚢 Deploy

### Desenvolvimento Local

```bash
npm run dev
```

### Build para Produção

```bash
npm run build
```

### Deploy no Cloudflare

```bash
# Login no Cloudflare
npx wrangler login

# Aplicar migrações no banco de produção
npx wrangler d1 migrations apply <database-name>

# Deploy do worker
npx wrangler deploy
```

## 🔐 Variáveis de Ambiente

Todas as configurações necessárias estão no arquivo `wrangler.json`:

- **Database**: Configurado via D1 binding
- **Storage**: Configurado via R2 binding
- **Secrets**: Adicione via Cloudflare Dashboard ou CLI

Para adicionar secrets em produção:

```bash
npx wrangler secret put <SECRET_NAME>
```

## 📝 Guia de Desenvolvimento

### Criando uma Nova Rota de API

1. Crie um arquivo em `src/worker/routes/`:
```typescript
import { Hono } from 'hono';

const myRoute = new Hono<{ Bindings: Env }>();

myRoute.get('/', async (c) => {
  return c.json({ message: 'Hello' });
});

export default myRoute;
```

2. Adicione a rota no `src/worker/index.ts`:
```typescript
import myRoute from './routes/myRoute';
app.route('/api/myroute', myRoute);
```

### Criando uma Nova Página

1. Crie um arquivo em `src/react-app/pages/`:
```typescript
export default function MyPage() {
  return <div>My Page</div>;
}
```

2. Adicione a rota no `src/react-app/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

### Adicionando uma Migração

Crie um novo arquivo SQL em `migrations/`:

```sql
-- Up migration
CREATE TABLE my_table (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

-- Down migration  
DROP TABLE my_table;
```

## 🧪 Testes

```bash
# Rodar testes (quando implementado)
npm test

# Verificar tipos TypeScript
npm run check
```

## 📄 Licença

Todos os direitos reservados © 2024 Teagendei

## 🤝 Suporte

Para suporte, entre em contato através do email: suporte@teagendei.com

## 🎯 Roadmap

### Fase 1 - Core (Atual)
- [x] Setup inicial e infraestrutura
- [x] Sistema de autenticação
- [x] Gestão de empresas e unidades
- [x] CRUD de serviços

### Fase 2 - Agendamentos
- [ ] Fluxo completo de agendamentos
- [ ] Seleção de horários
- [ ] Gestão de profissionais
- [ ] Bloqueios de agenda

### Fase 3 - Pagamentos
- [ ] Integração com Pix
- [ ] Checkout
- [ ] Gestão financeira

### Fase 4 - Notificações
- [ ] WhatsApp Business API
- [ ] Email notifications
- [ ] Lembretes automáticos

### Fase 5 - Cliente
- [ ] PWA para clientes
- [ ] Área do cliente
- [ ] Histórico de agendamentos
- [ ] Sistema de favoritos

### Fase 6 - Analytics
- [ ] Relatórios avançados
- [ ] Dashboards executivos
- [ ] KPIs e métricas

---

Desenvolvido com ❤️ para profissionalizar a gestão de pequenos e médios negócios
