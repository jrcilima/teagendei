CONTEXTO DO PROJETO - VERSÃO 1.0.9
Data de Geração: 11/12/2025 01:09:00
==================================================

ESTRUTURA DE DIRETÓRIOS:
.
├── index.html
├── package.json
├── pb_schema.md
├── projeto_contexto_v1.0.8.md
├── Projeto_TeAgendei_v2.1.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .cursor/
│   ├── worktrees.json
├── public/
├── src/
│   ├── vite-end.d.ts
│   ├── react-app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   │   ├── booking/
│   │   │   │   ├── StepService.tsx
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── TenantContext.tsx
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   ├── client.ts
│   │   │   │   ├── dashboard.ts
│   │   │   │   ├── onboarding.ts
│   │   │   │   ├── pocketbase.ts
│   │   │   │   ├── register.ts
│   │   │   │   ├── services.ts
│   │   │   ├── utils/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   ├── booking/
│   │   │   ├── client/
│   │   │   │   ├── ClientPanelPage.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardHome.tsx
│   │   │   ├── onboarding/
│   │   │   │   ├── CompanyStep.tsx
│   │   │   │   ├── DoneStep.tsx
│   │   │   │   ├── OnboardingRouter.tsx
│   │   │   │   ├── OwnerProfessionalStep.tsx
│   │   │   │   ├── ShopStep.tsx
│   │   │   ├── owner/
│   │   │   ├── public/
│   │   │   │   ├── LandingPage.tsx
│   │   │   ├── staff/
│   │   │   │   ├── AgendaPage.tsx
│   │   ├── routes/
│   │   │   ├── AppRouter.tsx
│   │   │   ├── ProtectedRoute.tsx
│   ├── shared/
│   │   ├── types.ts
│   │   ├── utils/


==================================================
CONTEÚDO DOS ARQUIVOS
==================================================


--- INICIO DO ARQUIVO: index.html ---
Path: index.html
------------------------------
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>TeAgendei</title>

    <!-- Tailwind (opcional – caso esteja usando CDN para testes rápidos) -->
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->

    <!-- Ícones PWA/favicons podem ser colocados depois -->
  </head>

  <body>
    <!-- root principal onde o React renderiza tudo -->
    <div id="root"></div>

    <!-- entrada do Vite que inicializa o React -->
    <script type="module" src="/src/react-app/main.tsx"></script>
  </body>
</html>

--- FIM DO ARQUIVO: index.html ---


--- INICIO DO ARQUIVO: package.json ---
Path: package.json
------------------------------
{
  "name": "teagendei",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "pocketbase": "^0.26.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.10.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.4.5",
    "vite": "^5.2.10"
  }
}

--- FIM DO ARQUIVO: package.json ---


--- INICIO DO ARQUIVO: pb_schema.md ---
Path: pb_schema.md
------------------------------
[
  {
    "id": "pbc_3142635823",
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "name": "_superusers",
    "type": "auth",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cost": 0,
        "hidden": true,
        "id": "password901924565",
        "max": 0,
        "min": 8,
        "name": "password",
        "pattern": "",
        "presentable": false,
        "required": true,
        "system": true,
        "type": "password"
      },
      {
        "autogeneratePattern": "[a-zA-Z0-9]{50}",
        "hidden": true,
        "id": "text2504183744",
        "max": 60,
        "min": 30,
        "name": "tokenKey",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "exceptDomains": null,
        "hidden": false,
        "id": "email3885137012",
        "name": "email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      },
      {
        "hidden": false,
        "id": "bool1547992806",
        "name": "emailVisibility",
        "presentable": false,
        "required": false,
        "system": true,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool256245529",
        "name": "verified",
        "presentable": false,
        "required": false,
        "system": true,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": true,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": true,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_3142635823` ON `_superusers` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_3142635823` ON `_superusers` (`email`) WHERE `email` != ''"
    ],
    "system": true,
    "authRule": "",
    "manageRule": null,
    "authAlert": {
      "enabled": true,
      "emailTemplate": {
        "subject": "Login from a new location",
        "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location:</p>\n<p><em>{ALERT_INFO}</em></p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>If this was you, you may disregard this email.</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
      }
    },
    "oauth2": {
      "mappedFields": {
        "id": "",
        "name": "",
        "username": "",
        "avatarURL": ""
      },
      "enabled": false
    },
    "passwordAuth": {
      "enabled": true,
      "identityFields": [
        "email"
      ]
    },
    "mfa": {
      "enabled": false,
      "duration": 1800,
      "rule": ""
    },
    "otp": {
      "enabled": false,
      "duration": 180,
      "length": 8,
      "emailTemplate": {
        "subject": "OTP for {APP_NAME}",
        "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
      }
    },
    "authToken": {
      "duration": 86400
    },
    "passwordResetToken": {
      "duration": 1800
    },
    "emailChangeToken": {
      "duration": 1800
    },
    "verificationToken": {
      "duration": 259200
    },
    "fileToken": {
      "duration": 180
    },
    "verificationTemplate": {
      "subject": "Verify your {APP_NAME} email",
      "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    },
    "resetPasswordTemplate": {
      "subject": "Reset your {APP_NAME} password",
      "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    },
    "confirmEmailChangeTemplate": {
      "subject": "Confirm your {APP_NAME} new email address",
      "body": "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  },
  {
    "id": "_pb_users_auth_",
    "listRule": "id = @request.auth.id || (shop_id = @request.auth.shop_id && role != 'cliente') || (@request.auth.role = 'dono' && company_id = @request.auth.company_id)",
    "viewRule": "id = @request.auth.id || shop_id = @request.auth.shop_id || (@request.auth.role = 'dono' && company_id = @request.auth.company_id)",
    "createRule": "",
    "updateRule": "id = @request.auth.id || (company_id != \"\" && company_id = @request.auth.company_id && @request.auth.role = \"dono\")",
    "deleteRule": "id = @request.auth.id || (company_id != \"\" && company_id = @request.auth.company_id && @request.auth.role = \"dono\")",
    "name": "users",
    "type": "auth",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cost": 0,
        "hidden": true,
        "id": "password901924565",
        "max": 0,
        "min": 8,
        "name": "password",
        "pattern": "",
        "presentable": false,
        "required": true,
        "system": true,
        "type": "password"
      },
      {
        "autogeneratePattern": "[a-zA-Z0-9]{50}",
        "hidden": true,
        "id": "text2504183744",
        "max": 60,
        "min": 30,
        "name": "tokenKey",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "exceptDomains": null,
        "hidden": false,
        "id": "email3885137012",
        "name": "email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      },
      {
        "hidden": false,
        "id": "bool1547992806",
        "name": "emailVisibility",
        "presentable": false,
        "required": false,
        "system": true,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool256245529",
        "name": "verified",
        "presentable": false,
        "required": false,
        "system": true,
        "type": "bool"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 255,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "file376926767",
        "maxSelect": 1,
        "maxSize": 5242880,
        "mimeTypes": [
          "image/jpeg",
          "image/png",
          "image/svg+xml",
          "image/gif",
          "image/webp"
        ],
        "name": "avatar",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": null,
        "type": "file"
      },
      {
        "hidden": false,
        "id": "select1466534506",
        "maxSelect": 1,
        "name": "role",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "dono",
          "cliente",
          "staff"
        ]
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3866053794",
        "hidden": false,
        "id": "relation2543524566",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "company_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3896301928",
        "hidden": false,
        "id": "relation1293337821",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "shop_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1146066909",
        "max": 0,
        "min": 0,
        "name": "phone",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "bool2467008628",
        "name": "is_professional",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey__pb_users_auth_` ON `users` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email__pb_users_auth_` ON `users` (`email`) WHERE `email` != ''"
    ],
    "system": false,
    "authRule": "",
    "manageRule": null,
    "authAlert": {
      "enabled": false,
      "emailTemplate": {
        "subject": "Login from a new location",
        "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location:</p>\n<p><em>{ALERT_INFO}</em></p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>If this was you, you may disregard this email.</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
      }
    },
    "oauth2": {
      "mappedFields": {
        "id": "",
        "name": "name",
        "username": "",
        "avatarURL": "avatar"
      },
      "enabled": false
    },
    "passwordAuth": {
      "enabled": true,
      "identityFields": [
        "email"
      ]
    },
    "mfa": {
      "enabled": false,
      "duration": 1800,
      "rule": ""
    },
    "otp": {
      "enabled": false,
      "duration": 180,
      "length": 8,
      "emailTemplate": {
        "subject": "OTP for {APP_NAME}",
        "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
      }
    },
    "authToken": {
      "duration": 604800
    },
    "passwordResetToken": {
      "duration": 1800
    },
    "emailChangeToken": {
      "duration": 1800
    },
    "verificationToken": {
      "duration": 259200
    },
    "fileToken": {
      "duration": 180
    },
    "verificationTemplate": {
      "subject": "Verify your {APP_NAME} email",
      "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    },
    "resetPasswordTemplate": {
      "subject": "Reset your {APP_NAME} password",
      "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    },
    "confirmEmailChangeTemplate": {
      "subject": "Confirm your {APP_NAME} new email address",
      "body": "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  },
  {
    "id": "pbc_4275539003",
    "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "createRule": null,
    "updateRule": null,
    "deleteRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "name": "_authOrigins",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text455797646",
        "max": 0,
        "min": 0,
        "name": "collectionRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text127846527",
        "max": 0,
        "min": 0,
        "name": "recordRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text4228609354",
        "max": 0,
        "min": 0,
        "name": "fingerprint",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": true,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": true,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_authOrigins_unique_pairs` ON `_authOrigins` (collectionRef, recordRef, fingerprint)"
    ],
    "system": true
  },
  {
    "id": "pbc_2281828961",
    "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "createRule": null,
    "updateRule": null,
    "deleteRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "name": "_externalAuths",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text455797646",
        "max": 0,
        "min": 0,
        "name": "collectionRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text127846527",
        "max": 0,
        "min": 0,
        "name": "recordRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text2462348188",
        "max": 0,
        "min": 0,
        "name": "provider",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1044722854",
        "max": 0,
        "min": 0,
        "name": "providerId",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": true,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": true,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_externalAuths_record_provider` ON `_externalAuths` (collectionRef, recordRef, provider)",
      "CREATE UNIQUE INDEX `idx_externalAuths_collection_provider` ON `_externalAuths` (collectionRef, provider, providerId)"
    ],
    "system": true
  },
  {
    "id": "pbc_2279338944",
    "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "name": "_mfas",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text455797646",
        "max": 0,
        "min": 0,
        "name": "collectionRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text127846527",
        "max": 0,
        "min": 0,
        "name": "recordRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1582905952",
        "max": 0,
        "min": 0,
        "name": "method",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": true,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": true,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_mfas_collectionRef_recordRef` ON `_mfas` (collectionRef,recordRef)"
    ],
    "system": true
  },
  {
    "id": "pbc_1638494021",
    "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "name": "_otps",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text455797646",
        "max": 0,
        "min": 0,
        "name": "collectionRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text127846527",
        "max": 0,
        "min": 0,
        "name": "recordRef",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cost": 8,
        "hidden": true,
        "id": "password901924565",
        "max": 0,
        "min": 0,
        "name": "password",
        "pattern": "",
        "presentable": false,
        "required": true,
        "system": true,
        "type": "password"
      },
      {
        "autogeneratePattern": "",
        "hidden": true,
        "id": "text3866985172",
        "max": 0,
        "min": 0,
        "name": "sentTo",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": true,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": true,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_otps_collectionRef_recordRef` ON `_otps` (collectionRef, recordRef)"
    ],
    "system": true
  },
  {
    "id": "pbc_1037645436",
    "listRule": "shop_id.owner_id = @request.auth.id || barber_id = @request.auth.id || client_id = @request.auth.id",
    "viewRule": "shop_id.owner_id = @request.auth.id || barber_id = @request.auth.id || client_id = @request.auth.id",
    "createRule": "client_id = @request.auth.id",
    "updateRule": "shop_id.company_id.owner_id = @request.auth.id || barber_id = @request.auth.id || client_id = @request.auth.id",
    "deleteRule": null,
    "name": "appointments",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "date1345189255",
        "max": "",
        "min": "",
        "name": "start_time",
        "presentable": true,
        "required": true,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "date1096160257",
        "max": "",
        "min": "",
        "name": "end_time",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "select2063623452",
        "maxSelect": 1,
        "name": "status",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ]
      },
      {
        "hidden": false,
        "id": "select1580793482",
        "maxSelect": 1,
        "name": "payment_status",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "1",
          "2",
          "3"
        ]
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_568792081",
        "hidden": false,
        "id": "relation2069996022",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "payment_method",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "number1186288468",
        "max": null,
        "min": null,
        "name": "total_amount",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text18589324",
        "max": 0,
        "min": 0,
        "name": "notes",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation434858273",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "client_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation3220373234",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "barber_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_863811952",
        "hidden": false,
        "id": "relation3982272998",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "service_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_3896301928",
        "hidden": false,
        "id": "relation1293337821",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "shop_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_unique_active_booking` ON `appointments` (\n  `shop_id`,\n  `barber_id`,\n  `start_time`\n) WHERE status != 0",
      "CREATE UNIQUE INDEX `idx_unique_client_booking` ON `appointments` (\n  `start_time`,\n  `client_id`\n) WHERE status != '0'"
    ],
    "system": false
  },
  {
    "id": "pbc_3292755704",
    "listRule": "shop_id.owner_id = @request.auth.id",
    "viewRule": "shop_id.owner_id = @request.auth.id",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "shop_id.owner_id = @request.auth.id",
    "deleteRule": "shop_id.owner_id = @request.auth.id",
    "name": "categories",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_3896301928",
        "hidden": false,
        "id": "relation1293337821",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "shop_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [],
    "system": false
  },
  {
    "id": "pbc_1997259952",
    "listRule": "user_id = @request.auth.id\n",
    "viewRule": "user_id = @request.auth.id\n",
    "createRule": "@request.auth.id != \"\" \n&& \nuser_id = @request.auth.id\n",
    "updateRule": "user_id = @request.auth.id\n",
    "deleteRule": "user_id = @request.auth.id\n",
    "name": "client_companies",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation2809058197",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "user_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3866053794",
        "hidden": false,
        "id": "relation2543524566",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "company_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3896301928",
        "hidden": false,
        "id": "relation1293337821",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "shop_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_PQB5sTm0hQ` ON `client_companies` (\n  `user_id`,\n  `company_id`\n)"
    ],
    "system": false
  },
  {
    "id": "pbc_3866053794",
    "listRule": "owner_id = @request.auth.id || id = @request.auth.company_id",
    "viewRule": "owner_id = @request.auth.id || id = @request.auth.company_id",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "owner_id = @request.auth.id",
    "deleteRule": "owner_id = @request.auth.id",
    "name": "companies",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1935184049",
        "max": 0,
        "min": 0,
        "name": "legal_name",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3368456299",
        "max": 14,
        "min": 0,
        "name": "cnpj",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select3478682990",
        "maxSelect": 1,
        "name": "plan_status",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "trial",
          "active",
          "suspended",
          "cancelled"
        ]
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation2117886457",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "owner_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "select3713686397",
        "maxSelect": 1,
        "name": "plan",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "trial",
          "basic",
          "pro"
        ]
      },
      {
        "hidden": false,
        "id": "date2463190971",
        "max": "",
        "min": "",
        "name": "trial_expires_at",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "number2422433416",
        "max": 999,
        "min": 1,
        "name": "max_shops",
        "onlyInt": true,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number2770142971",
        "max": 999,
        "min": 1,
        "name": "max_professionals",
        "onlyInt": false,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "date3053057214",
        "max": "",
        "min": "",
        "name": "billing_cycle",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_JkQ9hVKoch` ON `companies` (`cnpj`)"
    ],
    "system": false
  },
  {
    "id": "pbc_568792081",
    "listRule": "is_active = true || company_id.owner_id = @request.auth.id",
    "viewRule": "is_active = true || company_id.owner_id = @request.auth.id",
    "createRule": "company_id.owner_id = @request.auth.id",
    "updateRule": "company_id.owner_id = @request.auth.id",
    "deleteRule": "company_id.owner_id = @request.auth.id",
    "name": "payment_methods",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_3866053794",
        "hidden": false,
        "id": "relation2543524566",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "company_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "bool458715613",
        "name": "is_active",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [],
    "system": false
  },
  {
    "id": "pbc_1719698224",
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "name": "segments",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text2560465762",
        "max": 0,
        "min": 0,
        "name": "slug",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "file1704208859",
        "maxSelect": 1,
        "maxSize": 5242880,
        "mimeTypes": [
          "image/svg+xml",
          "image/png",
          "image/jpeg"
        ],
        "name": "icon",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": [],
        "type": "file"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [],
    "system": false
  },
  {
    "id": "pbc_863811952",
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "shop_id.owner_id = @request.auth.id",
    "deleteRule": "shop_id.owner_id = @request.auth.id",
    "name": "services",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1843675174",
        "max": 0,
        "min": 0,
        "name": "description",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number3402113753",
        "max": null,
        "min": 0,
        "name": "price",
        "onlyInt": false,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number2254405824",
        "max": null,
        "min": 0,
        "name": "duration",
        "onlyInt": true,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "bool458715613",
        "name": "is_active",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_3896301928",
        "hidden": false,
        "id": "relation1293337821",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "shop_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3292755704",
        "hidden": false,
        "id": "relation306617826",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "category_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [],
    "system": false
  },
  {
    "id": "pbc_3015497551",
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\" &&\n@request.auth.role = \"dono\" &&\nshop_id.owner_id = @request.auth.id\n",
    "updateRule": "@request.auth.id != \"\" &&\n@request.auth.role = \"dono\" &&\nshop_id.owner_id = @request.auth.id\n",
    "deleteRule": "@request.auth.id != \"\" &&\n@request.auth.role = \"dono\" &&\nshop_id.owner_id = @request.auth.id\n",
    "name": "shop_hours",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3866053794",
        "hidden": false,
        "id": "relation2543524566",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "company_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3896301928",
        "hidden": false,
        "id": "relation1293337821",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "shop_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "select1267652495",
        "maxSelect": 1,
        "name": "weekday",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "dom",
          "seg",
          "ter",
          "qua",
          "qui",
          "sex",
          "sab"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1345189255",
        "max": 0,
        "min": 0,
        "name": "start_time",
        "pattern": "^\\d{2}:\\d{2}$",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1096160257",
        "max": 0,
        "min": 0,
        "name": "end_time",
        "pattern": "^\\d{2}:\\d{2}$",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "bool1418641467",
        "name": "is_closed",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_zCmYoRIcSW` ON `shop_hours` (\n  `company_id`,\n  `shop_id`,\n  `weekday`\n)"
    ],
    "system": false
  },
  {
    "id": "pbc_3896301928",
    "listRule": "is_active = true || owner_id = @request.auth.id || company_id.owner_id = @request.auth.id || id = @request.auth.shop_id",
    "viewRule": "is_active = true || owner_id = @request.auth.id || company_id.owner_id = @request.auth.id || id = @request.auth.shop_id",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "company_id.owner_id = @request.auth.id",
    "deleteRule": null,
    "name": "shops",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text2560465762",
        "max": 0,
        "min": 0,
        "name": "slug",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "file3834550803",
        "maxSelect": 1,
        "maxSize": 5242880,
        "mimeTypes": [],
        "name": "logo",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": [],
        "type": "file"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text223244161",
        "max": 0,
        "min": 0,
        "name": "address",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1146066909",
        "max": 0,
        "min": 0,
        "name": "phone",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_568792081",
        "hidden": false,
        "id": "relation2650017717",
        "maxSelect": 999,
        "minSelect": 0,
        "name": "accepted_payment_methods",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1910675334",
        "max": 0,
        "min": 0,
        "name": "pix_key",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select1401485156",
        "maxSelect": 1,
        "name": "pix_key_type",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "cpf",
          "cnpj",
          "email",
          "telefone",
          "aleatoria"
        ]
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_3866053794",
        "hidden": false,
        "id": "relation2543524566",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "company_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_1719698224",
        "hidden": false,
        "id": "relation3676924589",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "segment_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation2117886457",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "owner_id",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1843675174",
        "max": 0,
        "min": 0,
        "name": "description",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number2975870548",
        "max": null,
        "min": null,
        "name": "min_advance_time",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number3768161545",
        "max": null,
        "min": null,
        "name": "max_advance_time",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "bool458715613",
        "name": "is_active",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [],
    "system": false
  },
  {
    "id": "pbc_3980638064",
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "name": "subscriptions",
    "type": "base",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3866053794",
        "hidden": false,
        "id": "relation2543524566",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "company_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "select3713686397",
        "maxSelect": 1,
        "name": "plan",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "trial",
          "basic",
          "pro"
        ]
      },
      {
        "hidden": false,
        "id": "number2392944706",
        "max": 199.99,
        "min": 59.99,
        "name": "amount",
        "onlyInt": false,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "date2932989418",
        "max": "",
        "min": "",
        "name": "period_start",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "date179253131",
        "max": "",
        "min": "",
        "name": "period_end",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "bool1753056537",
        "name": "is_paid",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text18589324",
        "max": 0,
        "min": 0,
        "name": "notes",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "indexes": [],
    "system": false
  }
]
--- FIM DO ARQUIVO: pb_schema.md ---


--- INICIO DO ARQUIVO: projeto_contexto_v1.0.8.md ---
Path: projeto_contexto_v1.0.8.md
------------------------------

--- FIM DO ARQUIVO: projeto_contexto_v1.0.8.md ---


--- INICIO DO ARQUIVO: Projeto_TeAgendei_v2.1.md ---
Path: Projeto_TeAgendei_v2.1.md
------------------------------
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
--- FIM DO ARQUIVO: Projeto_TeAgendei_v2.1.md ---


--- INICIO DO ARQUIVO: tsconfig.json ---
Path: tsconfig.json
------------------------------
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowJs": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,


    "jsx": "react-jsx",

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

--- FIM DO ARQUIVO: tsconfig.json ---


--- INICIO DO ARQUIVO: tsconfig.node.json ---
Path: tsconfig.node.json
------------------------------
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}

--- FIM DO ARQUIVO: tsconfig.node.json ---


--- INICIO DO ARQUIVO: vite.config.ts ---
Path: vite.config.ts
------------------------------
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Config sem path e sem __dirname
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})

--- FIM DO ARQUIVO: vite.config.ts ---


--- INICIO DO ARQUIVO: .cursor\worktrees.json ---
Path: .cursor\worktrees.json
------------------------------
{
  "setup-worktree": [
    "npm install"
  ]
}

--- FIM DO ARQUIVO: .cursor\worktrees.json ---


--- INICIO DO ARQUIVO: src\vite-end.d.ts ---
Path: src\vite-end.d.ts
------------------------------
/// <reference types="vite/client" />

--- FIM DO ARQUIVO: src\vite-end.d.ts ---


--- INICIO DO ARQUIVO: src\react-app\App.tsx ---
Path: src\react-app\App.tsx
------------------------------
// src/react-app/App.tsx
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        {/* O AppRouter já contém BrowserRouter — não duplicar aqui */}
        <AppRouter />
      </TenantProvider>
    </AuthProvider>
  );
}

--- FIM DO ARQUIVO: src\react-app\App.tsx ---


--- INICIO DO ARQUIVO: src\react-app\main.tsx ---
Path: src\react-app\main.tsx
------------------------------
// src/react-app/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../index.css'; // se seu index.css estiver em src/index.css, ajuste o caminho

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

--- FIM DO ARQUIVO: src\react-app\main.tsx ---


--- INICIO DO ARQUIVO: src\react-app\components\booking\StepService.tsx ---
Path: src\react-app\components\booking\StepService.tsx
------------------------------
// Caminho: src/react-app/components/booking/StepService.tsx
import { useEffect, useState } from "react";
import type { Service, Shop } from "@/shared/types";
import { getServicesByShop } from "@/react-app/lib/api/services";

type StepServiceProps = {
  shop: Shop;
  service: Service | null;
  onChange: (data: Partial<{ service: Service | null }>) => void;
  onNext: () => void;
};

export default function StepService({
  shop,
  service,
  onChange,
  onNext,
}: StepServiceProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formatação de preço em BRL
  const formatPrice = (value: number | null | undefined): string => {
    if (value == null) return "-";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const list = await getServicesByShop(shop.id);
        if (!cancelled) {
          setServices(list);
        }
      } catch (err: any) {
        console.error(err);
        if (!cancelled) {
          setError(
            err?.message ||
              "Não foi possível carregar os serviços desta unidade."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [shop.id]);

  const handleSelect = (s: Service) => {
    onChange({ service: s });
  };

  const handleNext = () => {
    if (!service) return;
    onNext();
  };

  // ESTADOS

  if (loading) {
    return (
      <div className="py-10 text-sm text-slate-300">
        Carregando serviços da unidade <strong>{shop.name}</strong>...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 rounded-2xl border border-red-500/40 bg-red-500/5 px-4 text-sm text-red-100">
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-10 text-sm text-slate-300">
        Nenhum serviço está cadastrado ou ativo para esta unidade.
        <br />
        <span className="text-slate-500 text-xs">
          O dono precisa configurar os serviços no painel antes de liberar o
          agendamento público.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">
          Passo 1 • Serviço
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Escolha o serviço que você deseja agendar
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          Unidade:{" "}
          <span className="font-medium text-emerald-300">{shop.name}</span>
        </p>
      </div>

      {/* Lista de serviços */}
      <div className="grid gap-3 md:grid-cols-2">
        {services.map((s) => {
          const isSelected = service?.id === s.id;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s)}
              className={[
                "w-full text-left rounded-2xl border px-4 py-3.5 transition shadow-sm",
                "bg-slate-950/60 hover:bg-slate-900/80",
                "border-white/10 hover:border-emerald-400/70",
                isSelected
                  ? "ring-2 ring-emerald-400/80 border-emerald-400/80 shadow-emerald-500/30"
                  : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-50">
                      {s.name}
                    </span>
                    {s.duration != null && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                        {s.duration} min
                      </span>
                    )}
                  </div>

                  {s.description && (
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {s.description}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-sm font-semibold text-emerald-300">
                    {formatPrice(s.price)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Rodapé do passo */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
        <span>
          Selecione um serviço para avançar para a escolha do profissional.
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={!service}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 text-xs md:text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Avançar
          <span className="text-base">⟶</span>
        </button>
      </div>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\components\booking\StepService.tsx ---


--- INICIO DO ARQUIVO: src\react-app\contexts\AuthContext.tsx ---
Path: src\react-app\contexts\AuthContext.tsx
------------------------------
// src/react-app/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@/shared/types";
import {
  login as pbLogin,
  logout as pbLogout,
  getCurrentUserTyped,
  refreshAuth,
} from "@/react-app/lib/api/pocketbase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  // login REAL retorna o User autenticado
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializa sessão ao montar a app
  useEffect(() => {
    const init = async () => {
      try {
        await refreshAuth();
        const current = await getCurrentUserTyped(); // User | null
        setUser(current);
      } catch (err) {
        console.error("Erro ao inicializar auth", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void init();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      await pbLogin(email, password);
      const current = await getCurrentUserTyped(); // User | null

      if (!current) {
        // aqui eliminamos o `null` e garantimos o tipo `User`
        throw new Error("Não foi possível carregar o usuário autenticado.");
      }

      setUser(current);
      return current;
    } catch (err) {
      console.error("Erro no login", err);
      // repassa o erro para a tela tratar
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    pbLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
};

--- FIM DO ARQUIVO: src\react-app\contexts\AuthContext.tsx ---


--- INICIO DO ARQUIVO: src\react-app\contexts\TenantContext.tsx ---
Path: src\react-app\contexts\TenantContext.tsx
------------------------------
// src/react-app/contexts/TenantContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Company, Shop } from '@/shared/types';
import {
  getMyCompanies,
  getShopsByCompany,
} from '@/react-app/lib/api/pocketbase';
import { useAuth } from './AuthContext';

type TenantContextType = {
  currentCompany: Company | null;
  currentShop: Shop | null;
  companies: Company[];
  shops: Shop[];
  setCurrentCompany: (company: Company | null) => void;
  setCurrentShop: (shop: Shop | null) => void;
  reloadTenants: () => Promise<void>;
  refreshTenant: () => Promise<void>; // ✅ alias para o register usar
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const TenantProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [currentCompany, setCurrentCompanyState] = useState<Company | null>(null);
  const [currentShop, setCurrentShopState] = useState<Shop | null>(null);

  const load = async () => {
    if (!user) {
      setCompanies([]);
      setShops([]);
      setCurrentCompanyState(null);
      setCurrentShopState(null);
      return;
    }

    const comps = await getMyCompanies();
    setCompanies(comps);

    if (comps.length === 0) {
      setCurrentCompanyState(null);
      setShops([]);
      setCurrentShopState(null);
      return;
    }

    const company = comps[0];
    setCurrentCompanyState(company);

    const sh = await getShopsByCompany(company.id);
    setShops(sh);
    setCurrentShopState(sh[0] ?? null);
  };

  // Recarrega tenants quando o user muda (login/logout)
  useEffect(() => {
    void load();
  }, [user?.id]);

  const setCurrentCompany = (company: Company | null) => {
    setCurrentCompanyState(company);

    if (!company) {
      setShops([]);
      setCurrentShopState(null);
      return;
    }

    getShopsByCompany(company.id).then((sh) => {
      setShops(sh);
      setCurrentShopState(sh[0] ?? null);
    });
  };

  const setCurrentShop = (shop: Shop | null) => {
    setCurrentShopState(shop);
  };

  return (
    <TenantContext.Provider
      value={{
        currentCompany,
        currentShop,
        companies,
        shops,
        setCurrentCompany,
        setCurrentShop,
        reloadTenants: load,
        refreshTenant: load, // ✅ aqui o alias que o RegisterPage espera
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    throw new Error('useTenant deve ser usado dentro de TenantProvider');
  }
  return ctx;
};

--- FIM DO ARQUIVO: src\react-app\contexts\TenantContext.tsx ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\client.ts ---
Path: src\react-app\lib\api\client.ts
------------------------------
import {pb} from "./pocketbase";
import { ClientCompanyLink, User } from "@/shared/types";

export async function createClientUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const payload = {
    email,
    password,
    passwordConfirm: password,
    name,
    role: "cliente",
  };

  const record = await pb.collection("users").create(payload);
  return record as unknown as User;
}

export async function findExistingClientByEmail(
  email: string
): Promise<User | null> {
  try {
    const result = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    return result as unknown as User;
  } catch {
    return null;
  }
}

export async function linkClientToCompany(
  userId: string,
  companyId: string,
  shopId: string | null
): Promise<ClientCompanyLink> {
  const payload = { user_id: userId, company_id: companyId, shop_id: shopId };

  const record = await pb.collection("client_companies").create(payload);
  return record as unknown as ClientCompanyLink;
}

export async function isClientLinkedToCompany(
  userId: string,
  companyId: string
): Promise<boolean> {
  try {
    await pb
      .collection("client_companies")
      .getFirstListItem(`user_id="${userId}" && company_id="${companyId}"`);
    return true;
  } catch {
    return false;
  }
}

--- FIM DO ARQUIVO: src\react-app\lib\api\client.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\dashboard.ts ---
Path: src\react-app\lib\api\dashboard.ts
------------------------------
// src/react-app/lib/api/dashboard.ts

import {pb} from "./pocketbase";

/* ------------------------------------------------------
   Tipos do Dashboard
------------------------------------------------------ */

export type TodayKpis = {
  total_bookings: number;
  unique_clients: number;
  total_value: number;
};

export type TodayBooking = {
  id: string;
  client_name: string;
  professional_name: string;
  service_name: string;
  time: string;
};

/* ------------------------------------------------------
   Função: KPIs do dia
------------------------------------------------------ */

export async function fetchTodayKpis(shopId: string): Promise<TodayKpis> {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0]; // yyyy-mm-dd

  const records = await pb.collection("appointments").getFullList({
    filter: `shop_id = "${shopId}" && date = "${dateStr}"`,
    expand: "client_id,professional_id,service_id",
  });

  const total_bookings = records.length;

  const unique_clients = new Set(
    records.map((r) => r.client_id)
  ).size;

  const total_value = records.reduce((sum, r) => {
    const service = r.expand?.service_id;
    const value = service?.price ?? 0;
    return sum + Number(value);
  }, 0);

  return {
    total_bookings,
    unique_clients,
    total_value,
  };
}

/* ------------------------------------------------------
   Função: Próximos atendimentos do dia
------------------------------------------------------ */

export async function fetchTodayBookings(
  shopId: string
): Promise<TodayBooking[]> {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  const records = await pb.collection("appointments").getFullList({
    filter: `shop_id = "${shopId}" && date = "${dateStr}"`,
    sort: "start_time",
    expand: "client_id,professional_id,service_id",
  });

  return records.map((r) => ({
    id: r.id,
    client_name: r.expand?.client_id?.name ?? "Cliente",
    professional_name: r.expand?.professional_id?.name ?? "Profissional",
    service_name: r.expand?.service_id?.name ?? "Serviço",
    time: r.start_time ?? "",
  }));
}

--- FIM DO ARQUIVO: src\react-app\lib\api\dashboard.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\onboarding.ts ---
Path: src\react-app\lib\api\onboarding.ts
------------------------------
// Caminho: src/react-app/lib/api/onboarding.ts
import { pb } from "./pocketbase";
import type { Company, Shop, User } from "@/shared/types";

/**
 * HELPERS
 */
function asCompany(record: any): Company {
  return {
    id: record.id,
    legal_name: record.legal_name,
    cnpj: record.cnpj,
    plan_status: record.plan_status,
    owner_id: record.owner_id,
    plan: record.plan,
    trial_expires_at: record.trial_expires_at,
    max_shops: record.max_shops,
    max_professionals: record.max_professionals,
    billing_cycle: record.billing_cycle,
    created: record.created,
    updated: record.updated,
  };
}

function asShop(record: any): Shop {
  return {
    id: record.id,
    company_id: record.company_id,
    name: record.name,
    slug: record.slug,
    // Tratamento de campos opcionais para garantir string
    owner_id: record.owner_id,
    logo: record.logo || undefined,
    address: record.address || "",
    phone: record.phone || "",
    is_active: record.is_active,
    created: record.created,
    updated: record.updated,
  };
}

// Helper para User (Profissional)
function asUser(record: any): User {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    role: record.role,
    phone: record.phone,
    avatar: record.avatar,
    company_id: record.company_id,
    shop_id: record.shop_id,
    is_professional: record.is_professional,
    created: record.created,
    updated: record.updated,
  };
}

/**
 * 1️⃣ Criar empresa
 */
export async function onboardingCreateCompany(data: {
  legal_name: string;
  cnpj: string;
  owner_id: string;
}): Promise<Company> {
  const record = await pb.collection("companies").create({
    legal_name: data.legal_name,
    cnpj: data.cnpj,
    owner_id: data.owner_id,
    plan_status: "trial",
    // Valores padrão para o plano trial
    trial_expires_at: null,
    plan: "trial",
    max_shops: 1,
    max_professionals: 3,
    billing_cycle: null, 
  });

  return asCompany(record);
}

/**
 * 2️⃣ Criar unidade (shop)
 */
export async function onboardingCreateShop(data: {
  company_id: string;
  name: string;
  slug: string;
  phone?: string;
  address?: string;
  segment_id?: string;
}): Promise<Shop> {
  const record = await pb.collection("shops").create({
    company_id: data.company_id,
    name: data.name,
    slug: data.slug,
    phone: data.phone ?? "",
    address: data.address ?? "",
    segment_id: data.segment_id ?? "",
    is_active: true,
    // owner_id será preenchido automaticamente pelo Hook do PocketBase ou API Rule se configurado,
    // mas idealmente passamos se tivermos o contexto. 
    // OBS: No seu schema, shops tem owner_id. Se a regra não preencher, precisamos passar aqui.
    // Vou assumir que o backend resolve ou que vamos passar no createInitialShop abaixo.
  });

  return asShop(record);
}

// Wrapper para criar Shop já com owner_id (mais seguro)
export async function createInitialShop(
  companyId: string, 
  ownerId: string, 
  data: Partial<Shop>
): Promise<Shop> {
  const record = await pb.collection("shops").create({
    ...data,
    company_id: companyId,
    owner_id: ownerId,
    is_active: true
  });
  return asShop(record);
}

/**
 * 3️⃣ Transformar o Dono em Profissional
 * ATENÇÃO: Atualiza o User existente, NÃO cria registro novo em tabela inexistente.
 */
export async function onboardingCreateProfessional(data: {
  ownerId: string;
  shopId: string;
}): Promise<User> {
  // Atualizamos o próprio usuário dono para dizer que ele atende na loja
  const record = await pb.collection("users").update(data.ownerId, {
    is_professional: true,
    shop_id: data.shopId,
  });

  return asUser(record);
}

/**
 * 4️⃣ Buscar empresa do dono
 */
export async function getCompanyByOwner(ownerId: string): Promise<Company | null> {
  try {
    const list = await pb.collection("companies").getList(1, 1, {
      filter: `owner_id = "${ownerId}"`,
    });
    return list.items.length > 0 ? asCompany(list.items[0]) : null;
  } catch {
    return null;
  }
}

/**
 * 5️⃣ Buscar unidades da empresa
 */
export async function getShopsByCompany(companyId: string): Promise<Shop[]> {
  const list = await pb.collection("shops").getFullList({
    filter: `company_id = "${companyId}"`,
    sort: "+created",
  });

  return list.map(asShop);
}

/**
 * 6️⃣ Buscar profissionais por empresa (Correção: Busca em USERS)
 */
export async function getProfessionalsByCompany(companyId: string): Promise<User[]> {
  // Busca usuários que pertencem à empresa E têm a flag is_professional = true
  const list = await pb.collection("users").getFullList({
    filter: `company_id = "${companyId}" && is_professional = true`,
    sort: "+created",
  });

  return list.map(asUser);
}
--- FIM DO ARQUIVO: src\react-app\lib\api\onboarding.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\pocketbase.ts ---
Path: src\react-app\lib\api\pocketbase.ts
------------------------------
// src/react-app/lib/api/pocketbase.ts
import PocketBase, { AuthModel } from "pocketbase";
import { Company, Shop, User } from "@/shared/types";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL as string;

if (!PB_URL) {
  console.warn("VITE_POCKETBASE_URL não definido. Configure no .env");
}

export const pb = new PocketBase(PB_URL);

// ---------------------------
// Persistência manual do auth
// ---------------------------

const AUTH_STORAGE_KEY = "teagendei_auth_store";

function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      token: string;
      model: AuthModel | null;
    };
    if (parsed?.token) {
      pb.authStore.save(parsed.token, parsed.model || null);
    }
  } catch (err) {
    console.error("Erro ao carregar auth do localStorage", err);
  }
}

function subscribeAuthStore() {
  pb.authStore.onChange((token, model) => {
    try {
      const payload = JSON.stringify({ token, model });
      localStorage.setItem(AUTH_STORAGE_KEY, payload);
    } catch (err) {
      console.error("Erro ao salvar auth no localStorage", err);
    }
  });
}

// inicializa na carga do módulo
loadAuthFromStorage();
subscribeAuthStore();

// ---------------------------
// Helpers de AUTH
// ---------------------------

export async function login(email: string, password: string): Promise<User> {
  const authData = await pb
    .collection("users")
    .authWithPassword(email, password);
  // authData.record é o model do usuário autenticado
  return authData.record as unknown as User;
}

export function logout(): void {
  pb.authStore.clear();
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export async function refreshAuth(): Promise<void> {
  if (!pb.authStore.isValid) return;
  try {
    await pb.collection("users").authRefresh();
  } catch (err) {
    console.warn("Falha ao fazer authRefresh, limpando sessão", err);
    pb.authStore.clear();
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

export async function getCurrentUserTyped(): Promise<User | null> {
  const model = pb.authStore.model as AuthModel | null;
  if (!model) return null;

  // pega o user atualizado do PB (opcional, mas deixa o dado fresco)
  try {
    const record = await pb.collection("users").getOne<User>(model.id, {
      requestKey: `current_user_${model.id}`,
    });
    return record;
  } catch {
    // se der erro, retorna o que estiver no authStore mesmo
    return model as unknown as User;
  }
}

// ---------------------------
// Helpers multi-tenant básicos
// ---------------------------

export async function getMyCompanies(): Promise<Company[]> {
  const user = pb.authStore.model as AuthModel | null;
  if (!user) return [];

  // Dono: companies onde owner_id == @request.auth.id  (regra também está nas rules)
  const list = await pb.collection("companies").getFullList<Company>({
    filter: `owner_id = "${user.id}"`,
    sort: "created",
  });

  return list;
}

export async function getShopsByCompany(companyId: string): Promise<Shop[]> {
  if (!companyId) return [];

  const list = await pb.collection("shops").getFullList<Shop>({
    filter: `company_id = "${companyId}"`,
    sort: "name",
  });

  return list;
}

export function normalizeError(err: any): string {
  if (!err) return "Erro desconhecido";

  if (typeof err === "string") return err;

  if (err?.message) return err.message;

  try {
    return JSON.stringify(err);
  } catch {
    return "Erro inesperado";
  }
}

--- FIM DO ARQUIVO: src\react-app\lib\api\pocketbase.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\register.ts ---
Path: src\react-app\lib\api\register.ts
------------------------------
// src/react-app/lib/api/register.ts
import {pb} from "./pocketbase";
import type { RegisterOwnerInput, RegisterClientInput, ShopWithCompany } from "@/shared/types";

/* ============================================================
   1) DONO DO NEGÓCIO — Fluxo:
      - Criar usuário
      - Login feito fora desta função
      - Onboarding criará empresa + unidade
   ============================================================ */
export async function registerOwner(input: RegisterOwnerInput) {
  const payload = {
    email: input.email.trim(),
    name: input.name.trim(),
    phone: input.phone ?? "",
    password: input.password,
    passwordConfirm: input.password,
    role: "dono",
  };

  const user = await pb.collection("users").create(payload);
  return user;
}

/* ============================================================
  UTILITÁRIO — achar usuário por email
============================================================ */
export async function findUserByEmail(email: string): Promise<any | null> {
  try {
    const user = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);
    return user;
  } catch {
    return null;
  }
}

/* ============================================================
  UTILITÁRIO — verificar se user já está vinculado a empresa
============================================================ */
export async function isUserLinkedToCompany(
  userId: string,
  companyId: string
): Promise<boolean> {
  try {
    await pb
      .collection("client_companies")
      .getFirstListItem(`user_id="${userId}" && company_id="${companyId}"`);
    return true;
  } catch {
    return false;
  }
}

/* ============================================================
  UTILITÁRIO — criar vínculo cliente <-> empresa/unidade
============================================================ */
export async function linkUserToCompany(
  userId: string,
  companyId: string,
  shopId: string
) {
  const payload = {
    user_id: userId,
    company_id: companyId,
    shop_id: shopId,
  };

  const link = await pb.collection("client_companies").create(payload);
  return link;
}

/* ============================================================
   2) CLIENTE — Fluxo Real:
      - Checar se email já existe
         - Se existir → perguntar
         - Se confirmar → criar vínculo novo
      - Se não existir → criar user + vínculo
   ============================================================ */
export async function registerClient(input: RegisterClientInput) {
  const { email, password, name, phone, companyId, shopId } = input;

  const existingUser = await findUserByEmail(email);

  // --------------- Já existe usuário com mesmo email ---------------
  if (existingUser) {
    // Existe vínculo com esta empresa?
    const alreadyLinked = await isUserLinkedToCompany(
      existingUser.id,
      companyId
    );

    if (!alreadyLinked) {
      // Cria novo vínculo
      await linkUserToCompany(existingUser.id, companyId, shopId);
    }

    // Retorna o user já existente
    return existingUser;
  }

  // --------------- Criar novo usuário cliente ---------------
  const payload = {
    email,
    name,
    phone: phone ?? "",
    password,
    passwordConfirm: password,
    role: "cliente",
  };

  const user = await pb.collection("users").create(payload);

  // Criar vínculo obrigatório
  await linkUserToCompany(user.id, companyId, shopId);

  return user;
}

/* ============================================================
   3) Buscar shops ativos + empresa
============================================================ */
export async function fetchActiveShopsWithCompany(): Promise<ShopWithCompany[]> {
  const shops = await pb.collection("shops").getFullList({
    filter: `status = true`,
    sort: "name",
  });

  const result: ShopWithCompany[] = [];

  for (const shop of shops) {
    const company = await pb.collection("companies").getOne(shop.company_id);
    result.push({ shop, company });
  }

  return result;
}

/* ============================================================
   4) Buscar unidade por ID
============================================================ */
export async function getShopById(id: string) {
  return await pb.collection("shops").getOne(id);
}

/* ============================================================
   5) Buscar unidade por slug
============================================================ */
export async function getShopBySlug(slug: string) {
  const list = await pb.collection("shops").getFullList({
    filter: `slug="${slug}"`,
  });

  return list.length > 0 ? list[0] : null;
}

--- FIM DO ARQUIVO: src\react-app\lib\api\register.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\services.ts ---
Path: src\react-app\lib\api\services.ts
------------------------------
// Caminho: src/react-app/lib/api/services.ts
import {pb} from "./pocketbase"; // ← somente o pb, sem normalizeError
import type { Service } from "@/shared/types";

/**
 * Lista serviços ATIVOS de uma loja, ordenados por nome.
 */
export async function getServicesByShop(
  shopId: string
): Promise<Service[]> {
  try {
    const services = await pb.collection("services").getFullList<Service>({
      filter: `shop_id = "${shopId}" && is_active = true`,
      sort: "name",
    });

    return services;
  } catch (error) {
    console.error("Erro ao carregar serviços:", error);
    throw error; // ← retorna erro bruto
  }
}

/**
 * Busca um serviço pelo ID.
 */
export async function getServiceById(
  serviceId: string
): Promise<Service | null> {
  try {
    const record = await pb.collection("services").getOne<Service>(serviceId);
    return record ?? null;
  } catch (error: any) {
    if (error?.status === 404) {
      return null;
    }
    console.error("Erro ao buscar serviço:", error);
    throw error;
  }
}

--- FIM DO ARQUIVO: src\react-app\lib\api\services.ts ---


--- INICIO DO ARQUIVO: src\react-app\pages\auth\LoginPage.tsx ---
Path: src\react-app\pages\auth\LoginPage.tsx
------------------------------
// src/react-app/pages/auth/LoginPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTenant } from "../../contexts/TenantContext";
import type { User } from "@/shared/types";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const { refreshTenant } = useTenant();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password); // login NÃO retorna user

      await refreshTenant(); // sincroniza company/shop

      // user AGORA vem do AuthContext
      if (!user) {
        setError("Erro inesperado ao carregar dados do usuário.");
        return;
      }

      // REDIRECIONAMENTO PÓS LOGIN
      if (user.role === "dono") {
        if (!user.company_id) {
          navigate("/onboarding", { replace: true });
        } else {
          navigate("/app/dashboard", { replace: true });
        }
      } else if (user.role === "staff") {
        navigate("/app/staff/agenda", { replace: true });
      } else if (user.role === "cliente") {
        navigate("/client", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setError(
        err?.message === "Failed to authenticate."
          ? "E-mail ou senha inválidos."
          : err?.message || "Erro ao entrar. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = submitting;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* fundos blur */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full" />
        <div className="absolute -right-16 bottom-0 w-80 h-80 bg-sky-500/30 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="mb-6 text-center">
          <p className="text-xs tracking-[0.18em] uppercase text-slate-400 mb-2">
            Sistema de agendamentos
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            Faça login no TeaAgendei
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitore agenda, equipe e faturamento em tempo real.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] p-6 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-300">
                  Painel de controle
                </span>
                <span className="text-sm font-medium text-slate-50">
                  TeaAgendei
                </span>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-300">
              <div className="flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Status: Online
              </div>
              <span>Agenda em tempo real</span>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-500/10 border border-red-500/40 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-200">
                E-mail
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="voce@studio.com"
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-slate-200">Senha</label>
                <button
                  type="button"
                  className="text-sky-300 hover:text-sky-200"
                  onClick={() => {
                    // futura rota de "esqueci minha senha"
                    // por agora, só placeholder
                    alert("Recuperação de senha ainda não implementada.");
                  }}
                >
                  Esqueci a senha
                </button>
              </div>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-emerald-500"
                  defaultChecked
                />
                Lembrar acesso neste dispositivo
              </label>
              <span className="text-slate-400">
                Ambiente seguro • SSL ativo
              </span>
            </div>

            <button
              type="submit"
              disabled={disabled}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {disabled ? "Entrando..." : "Entrar agora"}
              <span className="text-lg">⟶</span>
            </button>
          </form>
        </div>

        <div className="mt-4 text-[11px] text-center text-slate-500">
          Não tem acesso? Fale com o administrador da sua barbearia/salão para
          criar seu usuário.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

--- FIM DO ARQUIVO: src\react-app\pages\auth\LoginPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\auth\RegisterPage.tsx ---
Path: src\react-app\pages\auth\RegisterPage.tsx
------------------------------
// src/react-app/pages/auth/RegisterPage.tsx

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTenant } from "../../contexts/TenantContext";

import {
  fetchActiveShopsWithCompany,
  getShopById,
  getShopBySlug,
  registerClient,
  registerOwner,
  findUserByEmail,
} from "../../lib/api/register";

import type { ShopWithCompany } from "@/shared/types";

type Mode = "owner" | "client";

export default function RegisterPage() {
  const [mode, setMode] = useState<Mode>("owner");

  // Campos comuns
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // CLIENTE
  const [shops, setShops] = useState<ShopWithCompany[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string>("");
  const [loadingShops, setLoadingShops] = useState(false);

  // Estados gerais
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Modal — confirmar vínculo extra
  const [showModal, setShowModal] = useState(false);
  const [pendingCompanyId, setPendingCompanyId] = useState<string>("");
  const [pendingShopId, setPendingShopId] = useState<string>("");

  const { login } = useAuth();
  const { reloadTenants } = useTenant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ============================================================
      Pré-seleção de unidade caso venha com ?shopId ou ?slug
  ============================================================ */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingShops(true);
      setError(null);

      try {
        const shopId = searchParams.get("shopId");
        const slug = searchParams.get("slug");

        const allShops = await fetchActiveShopsWithCompany();
        let preselected = null;

        if (shopId) {
          preselected = await getShopById(shopId);
        } else if (slug) {
          preselected = await getShopBySlug(slug);
        }

        setShops(allShops);
        if (cancelled) return;

        if (preselected) {
          setSelectedShopId(preselected.id);
        } else if (allShops.length > 0) {
          setSelectedShopId(allShops[0].shop.id);
        }
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar as unidades disponíveis.");
      } finally {
        if (!cancelled) setLoadingShops(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const selectedShop = useMemo(
    () => shops.find((s) => s.shop.id === selectedShopId) ?? null,
    [shops, selectedShopId]
  );

  /* ============================================================
      Validações
  ============================================================ */
  function validateCommon(): string | null {
    if (!name.trim()) return "Informe o nome.";
    if (!email.trim()) return "Informe o e-mail.";
    if (!password) return "Informe a senha.";
    if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    if (password !== passwordConfirm) return "As senhas não conferem.";
    return null;
  }

  function validateClient(): string | null {
    if (!selectedShopId) return "Selecione uma unidade para se vincular.";
    if (!selectedShop) return "Unidade selecionada inválida.";
    return null;
  }

  /* ============================================================
      SUBMIT PRINCIPAL
  ============================================================ */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const baseError = validateCommon();
    if (baseError) return setError(baseError);

    if (mode === "client") {
      const extra = validateClient();
      if (extra) return setError(extra);
    }

    // LIMPA MODAL
    setShowModal(false);

    setSubmitting(true);
    try {
      if (mode === "owner") {
        /* ------------------- DONO ------------------- */
        await registerOwner({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        });

        const user = await login(email.trim(), password);

        await reloadTenants();

        navigate("/onboarding", { replace: true });
        return;
      }

      /* ------------------- CLIENTE ------------------- */
      if (!selectedShop) throw new Error("Dados de unidade inválidos.");

      const companyId = selectedShop.shop.company_id;
      const shopId = selectedShop.shop.id;

      // Checa se existe o user
      const existingUser = await findUserByEmail(email.trim());

      if (existingUser) {
        // User existe → perguntar se quer vincular
        setPendingCompanyId(companyId);
        setPendingShopId(shopId);
        setShowModal(true);
        return;
      }

      // Criar novo user e vínculo
      await registerClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        companyId,
        shopId,
      });

      const logged = await login(email.trim(), password);

      const slug = selectedShop.shop.slug;
      navigate(`/book/${slug}`, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ??
        "Não foi possível concluir o cadastro. Tente novamente em instantes."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ============================================================
      Confirma cadastro adicional (modal)
  ============================================================ */
  async function confirmLink() {
    if (!selectedShop) return;

    try {
      setSubmitting(true);

      // Só chamar registerClient — ele adiciona vínculo
      await registerClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        companyId: pendingCompanyId,
        shopId: pendingShopId,
      });

      const logged = await login(email.trim(), password);

      const slug = selectedShop.shop.slug;
      navigate(`/book/${slug}`, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ??
        "Não foi possível concluir o cadastro. Tente novamente."
      );
    } finally {
      setSubmitting(false);
      setShowModal(false);
    }
  }

  function cancelLink() {
    setShowModal(false);
  }

  /* ============================================================
      RENDER
  ============================================================ */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10 relative">

      {/* fundo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 bg-emerald-500/25 blur-3xl rounded-full" />
        <div className="absolute -right-24 bottom-[-40px] w-96 h-96 bg-sky-500/25 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">

        {/* Lado esquerdo */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.18em] uppercase text-emerald-300/80">
            TeaAgendei • Plataforma SaaS de agendamento
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Crie seu acesso e
            <span className="text-emerald-400"> comece a organizar</span> seus agendamentos hoje.
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-lg">
            Donos gerenciam unidades, equipe e faturamento. Clientes agendam em poucos cliques na unidade preferida.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• 15 dias grátis para testar.</li>
            <li>• Clientes sempre vinculados à unidade onde se cadastrarem.</li>
            <li>• Agenda inteligente e antifuro.</li>
          </ul>
        </div>

        {/* Card de formulário */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl p-6 md:p-7 space-y-6">

          {/* header mini brand */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">Cadastro de acesso</span>
                <span className="text-sm font-medium text-slate-50">TeaAgendei</span>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-300">
              <div className="flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ambiente seguro</span>
              </div>
              <span>Dados criptografados</span>
            </div>
          </div>

          {/* Toggle dono/cliente */}
          <div className="inline-flex rounded-2xl bg-slate-950/60 border border-white/10 p-1 text-xs">
            <button
              type="button"
              onClick={() => setMode("owner")}
              className={`px-4 py-1.5 rounded-xl transition ${
                mode === "owner"
                  ? "bg-emerald-500 text-slate-950 font-semibold shadow-sm shadow-emerald-500/40"
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              Sou dono do negócio
            </button>
            <button
              type="button"
              onClick={() => setMode("client")}
              className={`px-4 py-1.5 rounded-xl transition ${
                mode === "client"
                  ? "bg-sky-500 text-slate-950 font-semibold shadow-sm shadow-sky-500/40"
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              Sou cliente
            </button>
          </div>

          {/* Formulário */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Campos comuns */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder={mode === "owner" ? "Ex.: João da Barbearia Central" : "Ex.: Maria Souza"}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50
                placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                placeholder="voce@seuemail.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">WhatsApp (opcional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50
                placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                placeholder="(00) 90000-0000"
              />
            </div>

            {/* Senhas */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">Confirmar senha</label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* CLIENTE — Seleção de Unidade */}
            {mode === "client" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Selecione a unidade onde você será atendido
                </label>

                {loadingShops ? (
                  <div className="text-xs text-slate-400">Carregando unidades...</div>
                ) : shops.length === 0 ? (
                  <div className="text-xs text-slate-400">Nenhuma unidade disponível.</div>
                ) : (
                  <select
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50
                    focus:outline-none focus:ring-2 focus:ring-sky-400/80"
                  >
                    {shops.map(({ shop, company }) => (
                      <option key={shop.id} value={shop.id}>
                        {company?.legal_name ?? "Empresa"} • {shop.name}
                      </option>
                    ))}
                  </select>
                )}

                {selectedShop && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Você será vinculado à unidade{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.shop.name}
                    </span>{" "}
                    da empresa{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.company?.legal_name}
                    </span>.
                  </p>
                )}
              </div>
            )}

            {/* ERRO */}
            {error && (
              <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                {error}
              </div>
            )}

            {/* BOTÃO SUBMIT */}
            <button
              type="submit"
              disabled={submitting || (mode === "client" && loadingShops)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 transition
              shadow-lg shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Criando acesso..."
                : mode === "owner"
                ? "Criar acesso de dono"
                : "Criar acesso de cliente"}
            </button>

            {/* Link para login */}
            <p className="text-[11px] text-center text-slate-400">
              Já tem acesso?{" "}
              <a href="/login" className="text-emerald-300 hover:text-emerald-200">
                Entrar no TeaAgendei
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* ============================================================
          MODAL — Confirmar vínculo adicional
      ============================================================ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-xl text-center space-y-4">

            <h2 className="text-xl font-semibold text-white">
              Você já possui cadastro em outra empresa
            </h2>

            <p className="text-slate-300 text-sm">
              Deseja também se cadastrar nesta unidade?
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={cancelLink}
                className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 hover:bg-slate-600 transition"
                disabled={submitting}
              >
                Cancelar
              </button>

              <button
                onClick={confirmLink}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 shadow-lg shadow-emerald-500/40 transition"
                disabled={submitting}
              >
                Sim, cadastrar também
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\auth\RegisterPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\client\ClientPanelPage.tsx ---
Path: src\react-app\pages\client\ClientPanelPage.tsx
------------------------------
// src/react-app/pages/client/ClientPanelPage.tsx
export default function ClientPanelPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-3">
        <h1 className="text-2xl font-semibold">Meus agendamentos</h1>
        <p className="text-sm text-slate-300">
          Aqui o cliente verá seus próximos horários, histórico e poderá
          remarcar/cancelar.
        </p>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">
          Ainda é um placeholder. Mais à frente vamos integrar com a coleção de
          agendamentos do PocketBase.
        </div>
      </div>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\client\ClientPanelPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\dashboard\DashboardHome.tsx ---
Path: src\react-app\pages\dashboard\DashboardHome.tsx
------------------------------
// src/react-app/pages/owner/DashboardHome.tsx
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const { currentCompany, currentShop } = useTenant();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm">
          <p>
            <span className="text-slate-400">Usuário: </span>
            <span className="font-medium">{user?.name || user?.email}</span>
          </p>
          <p>
            <span className="text-slate-400">Papel: </span>
            <span className="font-medium">{user?.role ?? "—"}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm">
            <h2 className="text-sm font-semibold mb-2">Empresa atual</h2>
            {currentCompany ? (
              <>
                <p className="font-medium">{currentCompany.legal_name}</p>
                <p className="text-slate-400 text-xs mt-1">
                  ID: {currentCompany.id}
                </p>
              </>
            ) : (
              <p className="text-slate-400 text-xs">
                Nenhuma empresa vinculada. Conclua o onboarding.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm">
            <h2 className="text-sm font-semibold mb-2">Unidade atual</h2>
            {currentShop ? (
              <>
                <p className="font-medium">{currentShop.name}</p>
                <p className="text-slate-400 text-xs mt-1">
                  Slug: {currentShop.slug}
                </p>
              </>
            ) : (
              <p className="text-slate-400 text-xs">
                Nenhuma unidade selecionada.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\dashboard\DashboardHome.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\onboarding\CompanyStep.tsx ---
Path: src\react-app\pages\onboarding\CompanyStep.tsx
------------------------------
// src/react-app/pages/onboarding/CompanyStep.tsx
import { FormEvent, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { createCompanyForOwner } from "@/react-app/lib/api/onboarding";
import type { CreateCompanyDTO } from "@/shared/types";

type Props = {
  onDone: () => void;
};

export default function CompanyStep({ onDone }: Props) {
  const { user } = useAuth();
  const { reloadTenants } = useTenant();

  const [legalName, setLegalName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="text-slate-200">
        Você precisa estar autenticado para continuar o onboarding.
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!legalName.trim()) {
      setError("Informe o nome da sua empresa.");
      return;
    }

    const payload: CreateCompanyDTO = {
      legal_name: legalName.trim(),
      cnpj: cnpj.trim() || undefined,
    };

    setSubmitting(true);

    try {
      await createCompanyForOwner(user.id, payload);
      await reloadTenants(); // para popular currentCompany
      onDone();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Não foi possível criar a empresa.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50">
          Cadastre sua empresa
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Esses dados identificam o seu negócio dentro do TeaAgendei.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Nome / Razão Social
          </label>
          <input
            type="text"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="Ex.: Barbearia Central LTDA"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            CNPJ (opcional)
          </label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="00.000.000/0000-00"
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-6 py-2.5 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Salvando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\onboarding\CompanyStep.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\onboarding\DoneStep.tsx ---
Path: src\react-app\pages\onboarding\DoneStep.tsx
------------------------------
// src/react-app/pages/onboarding/DoneStep.tsx
import { useNavigate } from "react-router-dom";

export default function DoneStep() {
  const navigate = useNavigate();

  function go() {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Tudo pronto! 🎉</h1>

        <p className="text-slate-300 text-sm">
          Sua empresa, unidade e perfil foram configurados.  
          Você já pode começar a usar o TeaAgendei.
        </p>

        <button
          onClick={go}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-black font-semibold mt-4"
        >
          Ir para o painel
        </button>
      </div>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\onboarding\DoneStep.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\onboarding\OnboardingRouter.tsx ---
Path: src\react-app\pages\onboarding\OnboardingRouter.tsx
------------------------------
// src/react-app/pages/onboarding/OnboardingRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import CompanyStep from "./CompanyStep";
import ShopStep from "./ShopStep";
import OwnerProfessionalStep from "./OwnerProfessionalStep";
import DoneStep from "./DoneStep";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function OnboardingRouter() {
  const { user } = useAuth();

  // Segurança extra (só donos)
  if (!user || user.role !== "dono") {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<CompanyStep />} />
      <Route path="/shop" element={<ShopStep />} />
      <Route path="/owner-pro" element={<OwnerProfessionalStep />} />
      <Route path="/done" element={<DoneStep />} />

      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\onboarding\OnboardingRouter.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\onboarding\OwnerProfessionalStep.tsx ---
Path: src\react-app\pages\onboarding\OwnerProfessionalStep.tsx
------------------------------
// Caminho: src/react-app/pages/onboarding/OwnerProfessionalStep.tsx
import { FormEvent, useState } from "react";
// Removemos useNavigate se não for usar, mas mantemos caso precise no futuro
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { onboardingCreateProfessional } from "@/react-app/lib/api/onboarding";

type Props = {
  onDone: () => void;
};

export default function OwnerProfessionalStep({ onDone }: Props) {
  const { user } = useAuth();
  const { currentShop, reloadTenants } = useTenant();
  
  const [isProfessional, setIsProfessional] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificação visual para o render (o usuário vê msg de erro se for null)
  if (!user || !currentShop) {
    return (
      <div className="p-6 text-slate-200 bg-red-900/20 rounded-xl border border-red-500/30">
        <p className="font-semibold text-red-200">Atenção</p>
        <p className="text-sm mt-1">
          Não foi possível identificar a empresa ou unidade criada. 
          Tente recarregar a página.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // CORREÇÃO DOS ERROS DE TYPESCRIPT AQUI:
    // Garantimos ao TS que user e currentShop existem antes de usar
    if (!user || !currentShop) {
      setError("Erro de sessão: Usuário ou Loja não identificados.");
      return;
    }

    // Se o dono NÃO quiser ser profissional, apenas finalizamos
    if (!isProfessional) {
      onDone();
      return;
    }

    setSubmitting(true);

    try {
      // Agora o TS sabe que user.id e currentShop.id são strings válidas
      await onboardingCreateProfessional({
        ownerId: user.id,
        shopId: currentShop.id,
      });

      // Atualiza contexto para refletir a mudança (is_professional = true)
      await reloadTenants(); 

      onDone();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message || "Erro ao definir perfil de profissional. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50">
          Você também atende clientes?
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Se você também corta cabelo, faz barba ou realiza serviços, 
          vamos ativar seu perfil de profissional nesta unidade.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Checkbox estilizado */}
        <label className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 bg-slate-900/50 cursor-pointer hover:bg-slate-800/50 transition">
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={isProfessional}
              onChange={(e) => setIsProfessional(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
            />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-medium text-slate-200">
              Sim, eu sou um profissional
            </span>
            <span className="block text-xs text-slate-400">
              Serei listado na agenda e poderei receber agendamentos dos clientes.
            </span>
          </div>
        </label>

        {error && (
          <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-4 py-3 text-xs text-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-3 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            "Salvando configurações..."
          ) : (
            <>
              Concluir Onboarding
              <span className="text-lg">⟶</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\pages\onboarding\OwnerProfessionalStep.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\onboarding\ShopStep.tsx ---
Path: src\react-app\pages\onboarding\ShopStep.tsx
------------------------------
// src/react-app/pages/onboarding/ShopStep.tsx
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { createInitialShop } from "@/react-app/lib/api/onboarding";
import type { CreateShopDTO } from "@/shared/types";

type Props = {
  onDone: () => void;
};

export default function ShopStep({ onDone }: Props) {
  const { user } = useAuth();
  const { currentCompany, reloadTenants } = useTenant();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [segmentId, setSegmentId] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug && name) {
      const base = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(base);
    }
  }, [name]);

  if (!user || !currentCompany) {
    return (
      <div className="text-slate-200">
        Conclua primeiro o cadastro da empresa para continuar.
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Informe o nome da unidade.");
      return;
    }
    if (!slug.trim()) {
      setError("Informe o slug da unidade.");
      return;
    }

    const payload: CreateShopDTO = {
      name: name.trim(),
      slug: slug.trim(),
      company_id: currentCompany.id,
      owner_id: user.id,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      segment_id: segmentId || undefined,
    };

    setSubmitting(true);

    try {
      await createInitialShop(currentCompany.id, user.id, {
        name: payload.name,
        slug: payload.slug,
        phone: payload.phone,
        address: payload.address,
        segment_id: payload.segment_id,
      });

      await reloadTenants(); // para popular currentShop
      onDone();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Não foi possível criar a unidade.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-50">
          Crie sua primeira unidade
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Essa unidade será usada para agendamentos e painel de controle.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Nome da unidade
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="Ex.: Unidade Centro"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Slug (endereço público)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="ex.: barbearia-central-centro"
          />
          <p className="text-[11px] text-slate-500">
            Esse slug será usado na página de agendamento:{" "}
            <span className="font-mono text-emerald-300">
              /book/{slug || "sua-unidade"}
            </span>
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Telefone / WhatsApp (opcional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="(00) 90000-0000"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Endereço (opcional)
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>

        {/* segment_id fica simples aqui (input texto / select manual).
           Depois podemos substituir por dropdown de segments do PB. */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Segmento (opcional, id)
          </label>
          <input
            type="text"
            value={segmentId}
            onChange={(e) => setSegmentId(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            placeholder="ID do segmento (se houver)"
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-6 py-2.5 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Salvando unidade..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\onboarding\ShopStep.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\public\LandingPage.tsx ---
Path: src\react-app\pages\public\LandingPage.tsx
------------------------------
// Caminho: src/react-app/pages/public/LandingPage.tsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* 🔮 Background com glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full" />
        <div className="absolute -right-16 bottom-0 w-80 h-80 bg-sky-500/30 blur-3xl rounded-full" />
      </div>

      {/* HERO */}
      <header className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Transforme a forma como você gerencia
          <br />
          <span className="text-emerald-400">agendamentos e clientes</span>
        </h1>

        <p className="text-slate-300 max-w-2xl mt-4 text-sm md:text-base">
          Uma plataforma completa para Barbearias, Salões, Clínicas Estéticas,
          Esmalterias e Studios. Tudo em um só lugar.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-lg hover:opacity-90"
          >
            Entrar
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold shadow-lg hover:bg-emerald-400"
          >
            Começar grátis por 15 dias
          </Link>
        </div>
      </header>

      {/* FERRAMENTAS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ferramentas que fazem diferença
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📅",
              title: "Agenda Inteligente",
              desc: "Evite overbooking com horários automatizados.",
            },
            {
              icon: "💈",
              title: "Profissionais organizados",
              desc: "Cada membro vê sua própria agenda e atualiza atendimentos.",
            },
            {
              icon: "📊",
              title: "Faturamento claro",
              desc: "Veja todos os números importantes em tempo real.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-emerald-600 to-sky-600">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Comece agora mesmo
        </h2>
        <p className="text-white/80 mb-6">Leva menos de 1 minuto.</p>

        <Link
          to="/register"
          className="px-10 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-xl hover:opacity-90"
        >
          Criar conta gratuitamente
        </Link>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm">
        © 2025 TeaAgendei — Todos os direitos reservados.
      </footer>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\public\LandingPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\staff\AgendaPage.tsx ---
Path: src\react-app\pages\staff\AgendaPage.tsx
------------------------------
// src/react-app/pages/staff/StaffAgendaPage.tsx
export default function StaffAgendaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-3">
        <h1 className="text-2xl font-semibold">Agenda do Profissional</h1>
        <p className="text-sm text-slate-300">
          Aqui o staff verá seus horários do dia, clientes e status dos
          atendimentos.
        </p>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">
          Componente placeholder. Vamos ligar com o PocketBase (appointments) na
          fase da agenda real.
        </div>
      </div>
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\staff\AgendaPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\routes\AppRouter.tsx ---
Path: src\react-app\routes\AppRouter.tsx
------------------------------
// src/react-app/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import BookPage from "../pages/booking/BookPage";

import OnboardingRouter from "../pages/onboarding/OnboardingRouter";
import DashboardHome from "../pages/dashboard/DashboardHome";

import StaffAgendaPage from "../pages/staff/StaffAgendaPage";
import ClientPanelPage from "../pages/client/ClientPanelPage";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÚBLICA RAIZ */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* BOOKING PÚBLICO */}
        <Route path="/book/:slug" element={<BookPage />} />

        {/* ONBOARDING MULTI-ETAPA (DONO) */}
        <Route
          path="/onboarding/*"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <OnboardingRouter />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD DO DONO */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <DashboardHome />
            </ProtectedRoute>
          }
        />

        {/* AGENDA DO PROFISSIONAL */}
        <Route
          path="/staff/agenda"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffAgendaPage />
            </ProtectedRoute>
          }
        />

        {/* PAINEL DO CLIENTE */}
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <ClientPanelPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


--- FIM DO ARQUIVO: src\react-app\routes\AppRouter.tsx ---


--- INICIO DO ARQUIVO: src\react-app\routes\ProtectedRoute.tsx ---
Path: src\react-app\routes\ProtectedRoute.tsx
------------------------------
// src/react-app/routes/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { UserRole } from "@/shared/types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children: ReactNode;
}

const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, string> = {
  dono: "/owner/dashboard",
  staff: "/staff/agenda",
  cliente: "/client",
};

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth(); // <-- nomes reais
  const location = useLocation();

  // Estado de carregamento inicial
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Não autenticado → volta ao login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = user.role as UserRole;

  // Se rota requer role, validar
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const fallback = DEFAULT_ROUTE_BY_ROLE[userRole] ?? "/";
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}

--- FIM DO ARQUIVO: src\react-app\routes\ProtectedRoute.tsx ---


--- INICIO DO ARQUIVO: src\shared\types.ts ---
Path: src\shared\types.ts
------------------------------
// src/shared/types.ts

// ------------------------------------
// ENUMS / TIPOS BÁSICOS
// ------------------------------------

// Roles da tabela users
export type UserRole = 'dono' | 'cliente' | 'staff';

// Status do appointment (PocketBase usa "0"…"9")
export enum AppointmentStatus {
  Cancelled = '0',
  Pending = '1',
  Confirmed = '2',
  InProgress = '3',
  Completed = '4',
  NoShow = '5',
  Blocked = '6',
  Rescheduled = '7',
  AwaitingPayment = '8',
  Other = '9',
}

// Payment_status (1,2,3)
export enum PaymentStatus {
  A_PAGAR = '1',
  PAGO = '2',
  PENDENTE = '3',
}

// Tipos de chave PIX
export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';

// Dias da semana de shop_hours
export type Weekday = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

// Status do plano da empresa (campo antigo que ainda existe no schema)
export type CompanyPlanStatus = 'trial' | 'active' | 'suspended' | 'cancelled';

// Planos do SaaS (companies + subscriptions.plan)
export type SubscriptionPlan = 'trial' | 'basic' | 'pro';

// ------------------------------------
// BASE RECORD
// ------------------------------------

export interface BaseRecord {
  id: string;
  created: string; // ISO date
  updated: string; // ISO date
}

// ------------------------------------
// USERS (auth collection)
// ------------------------------------

export interface User extends BaseRecord {
  email: string;
  name?: string;
  avatar?: string; // file path PB
  role: UserRole;
  phone?: string;

  company_id?: string | null; // relation companies
  shop_id?: string | null; // relation shops

  is_professional?: boolean;
}

// ------------------------------------
// COMPANIES
// ------------------------------------

export interface Company extends BaseRecord {
  legal_name: string;
  cnpj?: string;
  plan_status: CompanyPlanStatus;

  owner_id: string; // relation user

  // 🔹 CAMPO NOVO: plano atual direto na empresa (select trial/basic/pro)
  plan?: SubscriptionPlan | null;

  // 🔹 Campo opcional de assinatura ativa (relation subscriptions)
  active_subscription_id?: string | null;

  // 🔹 Helpers de billing / limites, espelhando o que você colocou no schema.
  trial_expires_at?: string | null; // ISO date
  max_shops?: number | null;
  max_professionals?: number | null;
  billing_cycle?: string | null; // ISO date (início do ciclo atual, por ex.)
}

// ------------------------------------
// SHOPS
// ------------------------------------

export interface Shop extends BaseRecord {
  name: string;
  slug: string;
  logo?: string;

  address?: string;
  phone?: string;

  company_id: string;
  owner_id: string;

  description?: string;

  accepted_payment_methods?: string[];

  pix_key?: string;
  pix_key_type?: PixKeyType;

  segment_id?: string | null;

  min_advance_time?: number | null;
  max_advance_time?: number | null;

  is_active?: boolean;
}

// ------------------------------------
// CATEGORIES
// ------------------------------------

export interface Category extends BaseRecord {
  name: string;
  shop_id: string;
}

// ------------------------------------
// SERVICES
// ------------------------------------

export interface Service extends BaseRecord {
  name: string;
  description?: string;

  price: number; // obrigatório
  duration: number; // minutos, obrigatório
  is_active?: boolean;

  shop_id: string;
  category_id?: string | null;
}

// ------------------------------------
// SHOP_HOURS
// ------------------------------------

export interface ShopHour extends BaseRecord {
  company_id: string;
  shop_id: string;

  weekday: Weekday; // dom..sab

  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"

  is_closed?: boolean;
}

// ------------------------------------
// PAYMENT_METHODS
// ------------------------------------

export interface PaymentMethod extends BaseRecord {
  name: string;
  company_id: string;
  is_active: boolean;
}

// ------------------------------------
// SEGMENTS
// ------------------------------------

export interface Segment extends BaseRecord {
  name: string;
  slug: string;
  icon?: string; // file
}

// ------------------------------------
// APPOINTMENTS
// ------------------------------------

export interface Appointment extends BaseRecord {
  start_time: string; // ISO
  end_time?: string | null; // ISO

  status: AppointmentStatus;
  payment_status: PaymentStatus;

  payment_method?: string | null; // relation payment_methods
  total_amount?: number | null;
  notes?: string;

  client_id: string; // relation users
  barber_id: string; // relation users
  service_id: string; // relation services
  shop_id: string; // relation shops
}

// ------------------------------------
// SUBSCRIPTIONS (nova tabela)
// ------------------------------------

export interface Subscription extends BaseRecord {
  company_id: string; // relation companies
  plan: SubscriptionPlan;
  trial_expires_at?: string | null; // ISO
  max_shops: number;
  max_professionals: number;
  billing_cycle?: string | null; // ISO (início do ciclo, vencimento etc.)
}

// ------------------------------------
// DTOs
// ------------------------------------

export interface CreateAppointmentDTO {
  start_time: string; // ISO
  end_time?: string;
  client_id: string;
  barber_id: string;
  service_id: string;
  shop_id: string;

  total_amount?: number;
  notes?: string;
  payment_method?: string | null;
}

export interface ClientAppointmentView {
  appointment: Appointment;
  service: Service;
  shop: Shop;
  barber: User;
}

export interface CreateCompanyDTO {
  legal_name: string;
  cnpj?: string;
}

export interface CreateShopDTO {
  name: string;
  slug: string;
  company_id: string;
  owner_id: string;
  phone?: string;
  address?: string;
  segment_id?: string;
}

// ------------------------------------
// TIPOS AUXILIARES FRONTEND
// ------------------------------------

export interface TimeSlot {
  time: string; // "HH:MM" local
  startISO: string; // UTC ISO
  endISO: string; // UTC ISO
  isAvailable: boolean;
}

export interface ProfessionalOption {
  id: string;
  name: string;
  avatar?: string;
}

// Vinculo cliente <-> empresa
export interface ClientCompanyLink extends BaseRecord {
  user_id: string;      // relation → users
  company_id: string;   // relation → companies
  shop_id?: string | null; // opcional
}

export interface RegisterOwnerInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterClientInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyId: string;
  shopId: string;
}

export interface ShopWithCompany {
  shop: any;
  company: any;
}

--- FIM DO ARQUIVO: src\shared\types.ts ---
