

organize a linha lógica completa da peça, escreva cada etapa do raciocínio, identifique riscos, fortaleça os pontos que são pontos fracos e só depois desenvolva cada tópico por vez!


##Estrutura de pastas do projeto
TEAGENDEI/
├── .wrangler/
├── node_modules/
├── src/
│   ├── react-app/
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   └── TenantContext.tsx
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   ├── usersApi.ts
│   │   │   │   ├── shopsApi.ts ##vazio
│   │   │   │   ├── servicesApi.ts ##vazio
│   │   │   │   └── appointmentsApi.ts ##vazio
│   │   │   ├── api.ts
│   │   │   ├── apiClient.ts
│   │   │   ├── pocketbase.ts
│   │   │   └── pocketbaseFactory.ts
│   │   ├── pages/
│   │   │   ├── Appointments.tsx
│   │   │   ├── BookingPage.tsx
│   │   │   ├── ClientDashboard.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Onboarding.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ServiceForm.tsx
│   │   │   ├── ServicesList.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── ShopForm.tsx
│   │   │   ├── StaffForm.tsx
│   │   │   └── StaffList.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   └── shared/
│       ├── schemas/
│       │   ├── _shared2.ts
│   	│   ├── appointment.ts
│   	│   ├── service.ts
│   	│   ├── shop.ts
│   	│   └── user.ts
│       ├── utils/
│       │   └── timeSlots.ts
│       └── types.ts
├── .env
├── .env.local
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── pb_schema_v034_2(novo).md
├── postcss.config.js
├── README.md
├── script_export_project.py
├── tailwind.config.js
├── TeAgendei.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts