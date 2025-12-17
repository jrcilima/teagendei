CONTEXTO DO PROJETO - VERSÃO 1.0.29
Data de Geração: 17/12/2025 00:11:05
### SEMPRE DIGITE OS CÓDIGOS, MESMO COM CORREÇÕES COMPLETO! NÃO SUGIRA CÓDIGOS PARA ALTERAR ALGUM JÁ CRIADO, SEMPRE O CÓDIGO COMPLETO.
==================================================

ESTRUTURA DE DIRETÓRIOS:
.
├── index.html
├── package.json
├── pb_schema.md
├── projeto_contexto_v1.0.28.md
├── Projeto_TeAgendei_v2.1.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .cursor/
│   ├── worktrees.json
├── public/
├── src/
│   ├── index.css
│   ├── vite-end.d.ts
│   ├── react-app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   │   ├── booking/
│   │   │   │   ├── StepConfirm.tsx
│   │   │   │   ├── StepDateTime.tsx
│   │   │   │   ├── StepProfessional.tsx
│   │   │   │   ├── StepService.tsx
│   │   │   ├── common/
│   │   │   │   ├── Modal.tsx
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── TenantContext.tsx
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   ├── appointments.ts
│   │   │   │   ├── availability.ts
│   │   │   │   ├── client.ts
│   │   │   │   ├── dashboard.ts
│   │   │   │   ├── onboarding.ts
│   │   │   │   ├── pocketbase.ts
│   │   │   │   ├── register.ts
│   │   │   │   ├── services.ts
│   │   │   │   ├── shop-hours.ts
│   │   │   │   ├── shops.ts
│   │   │   │   ├── staff.ts
│   │   │   ├── utils/
│   │   │   │   ├── slots.ts
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   ├── booking/
│   │   │   │   ├── BookPage.tsx
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
│   │   │   │   ├── ServicesPage.tsx
│   │   │   │   ├── SettingsPage.tsx
│   │   │   │   ├── ShopsPage.tsx
│   │   │   │   ├── StaffPage.tsx
│   │   │   ├── public/
│   │   │   │   ├── LandingPage.tsx
│   │   │   ├── staff/
│   │   │   │   ├── StaffAgendaPage.tsx
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

    <script src="https://cdn.tailwindcss.com"></script>

    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
            },
          }
        }
      }
    </script>
  </head>

  <body>
    <div id="root"></div>

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


--- INICIO DO ARQUIVO: projeto_contexto_v1.0.28.md ---
Path: projeto_contexto_v1.0.28.md
------------------------------

--- FIM DO ARQUIVO: projeto_contexto_v1.0.28.md ---


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


--- INICIO DO ARQUIVO: src\index.css ---
Path: src\index.css
------------------------------
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  
  /* Força o esquema dark já que o design usa cores escuras */
  color-scheme: dark; 
  background-color: #020617; /* slate-950 aproximado */
  color: rgba(255, 255, 255, 0.87);
}

body {
  margin: 0;
  min-height: 100vh;
}
--- FIM DO ARQUIVO: src\index.css ---


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


--- INICIO DO ARQUIVO: src\react-app\components\booking\StepConfirm.tsx ---
Path: src\react-app\components\booking\StepConfirm.tsx
------------------------------
// Caminho: src/react-app/components/booking/StepConfirm.tsx
import { useState } from "react";
import type { Shop, Service, User } from "@/shared/types";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { createAppointment } from "@/react-app/lib/api/appointments";
import { useNavigate } from "react-router-dom";

type Props = {
  shop: Shop;
  service: Service;
  professional: User;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  onBack: () => void;
};

export default function StepConfirm({ shop, service, professional, date, time, onBack }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formatar data para exibição amigável
  const dateDisplay = new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Calcular horário de término estimado
  function calculateEndTime() {
    const [h, m] = time.split(":").map(Number);
    const dateObj = new Date();
    dateObj.setHours(h, m + service.duration);
    return dateObj.toTimeString().slice(0, 5);
  }

  const endTime = calculateEndTime();

  async function handleConfirm() {
    // Validação de login: O cliente precisa estar logado para agendar?
    // Se sim, aqui verificamos. Se não, precisaríamos de um form de "Guest".
    // Pelo contexto atual, vamos assumir que ele precisa estar logado (ClientPanelPage existe).
    
    if (!user) {
      // Redirecionar para login salvando o estado seria o ideal, 
      // mas por simplicidade vamos pedir login.
      alert("Você precisa fazer login ou criar conta para finalizar.");
      navigate("/login"); 
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Montar data ISO completa para o banco
      const startIso = `${date} ${time}:00`;
      
      // Calcular end_time ISO (opcional, mas bom ter)
      // Simplificação: apenas string para o PB aceitar, idealmente calcularia real
      
      await createAppointment({
        shop_id: shop.id,
        service_id: service.id,
        barber_id: professional.id,
        client_id: user.id,
        start_time: startIso,
        total_amount: service.price,
        notes: "Agendamento via App"
      });

      // Sucesso! Redirecionar para painel do cliente
      navigate("/client");
      
    } catch (err: any) {
      console.error(err);
      setError("Erro ao confirmar agendamento. Tente novamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-white mb-2 transition">← Voltar</button>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">Passo 4 • Confirmação</p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">Confira os detalhes</h2>
      </div>

      <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5 space-y-4 text-sm">
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Serviço</span>
          <span className="font-medium text-white">{service.name}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Profissional</span>
          <span className="font-medium text-white">{professional.name}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Data</span>
          <span className="font-medium text-white capitalize">{dateDisplay}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-3">
          <span className="text-slate-400">Horário</span>
          <span className="font-medium text-emerald-400">{time} - {endTime}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-slate-400">Valor Total</span>
          <span className="font-bold text-lg text-white">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(service.price)}
          </span>
        </div>
      </div>

      {!user && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-xs text-yellow-200">
          Você precisará fazer login na próxima etapa para confirmar.
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-xs text-red-200">
          {error}
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={submitting}
        className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Confirmando..." : "Confirmar Agendamento"}
      </button>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\components\booking\StepConfirm.tsx ---


--- INICIO DO ARQUIVO: src\react-app\components\booking\StepDateTime.tsx ---
Path: src\react-app\components\booking\StepDateTime.tsx
------------------------------
// Caminho: src/react-app/components/booking/StepDateTime.tsx
import { useEffect, useState } from "react";
import type { Shop, Service, User, TimeSlot, ShopHour } from "@/shared/types";
import { getShopHours, getProfessionalAppointments } from "@/react-app/lib/api/availability";
import { generateSlots } from "@/react-app/lib/utils/slots";

type Props = {
  shop: Shop;
  service: Service;
  professional: User;
  onBack: () => void;
  onNext: (date: string, time: string) => void;
};

export default function StepDateTime({ shop, service, professional, onBack, onNext }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>(""); // YYYY-MM-DD
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [shopHours, setShopHours] = useState<ShopHour[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // 1. Carrega horários da loja ao montar
  useEffect(() => {
    getShopHours(shop.id).then(setShopHours);
    
    // Seta data de hoje como padrão
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, [shop.id]);

  // 2. Quando muda a data, recalcula slots
  useEffect(() => {
    if (!selectedDate || shopHours.length === 0) return;

    async function loadSlots() {
      setLoading(true);
      const appointments = await getProfessionalAppointments(professional.id, selectedDate);
      
      const generated = generateSlots(
        selectedDate,
        service.duration,
        shopHours,
        appointments
      );
      
      setSlots(generated);
      setLoading(false);
    }

    loadSlots();
  }, [selectedDate, shopHours, professional.id, service.duration]);

  return (
    <div className="space-y-6">
      <div>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-white mb-2 transition flex items-center gap-1">← Voltar</button>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">Passo 3 • Data e Hora</p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">Quando será o atendimento?</h2>
        <p className="text-sm text-slate-300 mt-1">
          Profissional: <span className="text-emerald-300">{professional.name}</span> • Duração: {service.duration} min
        </p>
      </div>

      {/* Seletor de Data Simples (Nativo por enquanto) */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400">Selecione o dia</label>
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot(null);
          }}
          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Grid de Horários */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400">Horários disponíveis</label>
        
        {loading ? (
          <div className="py-8 text-center text-slate-500 text-sm animate-pulse">Calculando agenda...</div>
        ) : slots.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm bg-slate-950/30 rounded-xl border border-white/5">
            Nenhum horário disponível nesta data.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
            {slots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.isAvailable}
                onClick={() => setSelectedSlot(slot.time)}
                className={`
                  py-2 px-1 rounded-lg text-sm font-medium transition
                  ${!slot.isAvailable 
                    ? "bg-slate-800/50 text-slate-600 cursor-not-allowed line-through" 
                    : selectedSlot === slot.time
                      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  }
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-white/5">
        <button
          onClick={() => selectedSlot && onNext(selectedDate, selectedSlot)}
          disabled={!selectedSlot}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2.5 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar Horário
          <span>⟶</span>
        </button>
      </div>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\components\booking\StepDateTime.tsx ---


--- INICIO DO ARQUIVO: src\react-app\components\booking\StepProfessional.tsx ---
Path: src\react-app\components\booking\StepProfessional.tsx
------------------------------
// Caminho: src/react-app/components/booking/StepProfessional.tsx
import { useEffect, useState } from "react";
import type { User, Shop, Service } from "@/shared/types";
import { getProfessionalsByShop } from "@/react-app/lib/api/staff";

type StepProfessionalProps = {
  shop: Shop;
  service: Service;
  professional: User | null;
  onChange: (data: Partial<{ professional: User | null }>) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function StepProfessional({
  shop,
  service,
  professional,
  onChange,
  onBack,
  onNext,
}: StepProfessionalProps) {
  const [professionals, setProfessionals] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const list = await getProfessionalsByShop(shop.id);
      if (!cancelled) {
        setProfessionals(list);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [shop.id]);

  const handleSelect = (user: User) => {
    onChange({ professional: user });
  };

  if (loading) {
    return (
      <div className="py-10 text-sm text-slate-300 animate-pulse">
        Buscando profissionais disponíveis...
      </div>
    );
  }

  if (professionals.length === 0) {
    return (
      <div className="space-y-4">
        <div className="py-6 px-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
          Nenhum profissional disponível para atendimento nesta unidade no momento.
        </div>
        <button
          onClick={onBack}
          className="text-sm text-slate-400 hover:text-white transition"
        >
          ← Voltar e escolher outro serviço
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white mb-2 transition flex items-center gap-1"
        >
          ← Voltar
        </button>
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">
          Passo 2 • Profissional
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Com quem você quer realizar este serviço?
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          Serviço selecionado:{" "}
          <span className="font-medium text-emerald-300">{service.name}</span>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {professionals.map((p) => {
          const isSelected = professional?.id === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelect(p)}
              className={[
                "relative w-full text-left rounded-2xl border px-4 py-4 transition group",
                "bg-slate-950/60 hover:bg-slate-900/80",
                "border-white/10 hover:border-emerald-400/50",
                isSelected
                  ? "ring-2 ring-emerald-400/80 border-emerald-400/80 bg-emerald-950/20"
                  : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shadow-inner ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                  }`}
                >
                  {p.avatar ? (
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    (p.name?.[0] || p.email[0] || "?").toUpperCase()
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${
                      isSelected ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {p.name || "Profissional sem nome"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {p.role === "dono" ? "Sócio / Profissional" : "Staff"}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={onNext}
          disabled={!professional}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2.5 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          Ver horários disponíveis
          <span>⟶</span>
        </button>
      </div>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\components\booking\StepProfessional.tsx ---


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


--- INICIO DO ARQUIVO: src\react-app\components\common\Modal.tsx ---
Path: src\react-app\components\common\Modal.tsx
------------------------------
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\components\common\Modal.tsx ---


--- INICIO DO ARQUIVO: src\react-app\components\layout\AppLayout.tsx ---
Path: src\react-app\components\layout\AppLayout.tsx
------------------------------
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col md:ml-64 transition-all">
        <Header />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\components\layout\AppLayout.tsx ---


--- INICIO DO ARQUIVO: src\react-app\components\layout\Header.tsx ---
Path: src\react-app\components\layout\Header.tsx
------------------------------
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { currentShop } = useTenant();

  return (
    <header className="h-16 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      {/* Mobile Toggle (Placeholder) */}
      <div className="md:hidden text-slate-400">☰</div>

      {/* Info da Loja Atual */}
      <div className="hidden md:block">
        <h2 className="text-sm font-medium text-slate-200">
          {currentShop ? currentShop.name : "Selecione uma unidade"}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm text-white font-medium">{user?.name}</p>
          <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
        </div>
        
        <div className="h-9 w-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 overflow-hidden">
          {user?.avatar ? (
             <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover"/>
          ) : (
             <span>{user?.name?.[0]?.toUpperCase() || "U"}</span>
          )}
        </div>

        <button 
          onClick={logout}
          className="text-xs text-red-400 hover:text-red-300 transition ml-2"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
--- FIM DO ARQUIVO: src\react-app\components\layout\Header.tsx ---


--- INICIO DO ARQUIVO: src\react-app\components\layout\Sidebar.tsx ---
Path: src\react-app\components\layout\Sidebar.tsx
------------------------------
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const menu = [
    { label: "Visão Geral", path: "/owner/dashboard", icon: "📊" },
    { label: "Serviços", path: "/owner/services", icon: "✂️" },
    { label: "Profissionais", path: "/owner/staff", icon: "👥" },
    { label: "Unidades", path: "/owner/shops", icon: "🏪" },
    { label: "Configurações", path: "/owner/settings", icon: "⚙️" },
  ];

  // Se o dono também for profissional, mostra a agenda dele
  if (user?.is_professional) {
    menu.splice(1, 0, { label: "Minha Agenda", path: "/staff/agenda", icon: "📅" });
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-white/5 h-screen fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-bold mr-3">
          T
        </div>
        <span className="font-semibold text-white tracking-wide">TeaAgendei</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-slate-950/50 rounded-xl p-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Plano Atual</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Trial Grátis</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ativo</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
--- FIM DO ARQUIVO: src\react-app\components\layout\Sidebar.tsx ---


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


--- INICIO DO ARQUIVO: src\react-app\lib\api\appointments.ts ---
Path: src\react-app\lib\api\appointments.ts
------------------------------
// Caminho: src/react-app/lib/api/appointments.ts
import { pb } from "./pocketbase";
import type { CreateAppointmentDTO, Appointment } from "@/shared/types";

/**
 * Cria um novo agendamento
 */
export async function createAppointment(data: CreateAppointmentDTO): Promise<Appointment> {
  // O PocketBase espera o formato de data ISO UTC. 
  // O DTO já deve vir com a string correta (ex: "2023-12-25 14:30:00")
  
  const record = await pb.collection("appointments").create({
    start_time: data.start_time,
    end_time: data.end_time,
    client_id: data.client_id,
    barber_id: data.barber_id,
    service_id: data.service_id,
    shop_id: data.shop_id,
    status: "1", // 1 = Pendente/Confirmado (dependendo da sua regra)
    payment_status: "1", // 1 = A Pagar
    total_amount: data.total_amount,
    notes: data.notes
  });

  return record as unknown as Appointment;
}
--- FIM DO ARQUIVO: src\react-app\lib\api\appointments.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\availability.ts ---
Path: src\react-app\lib\api\availability.ts
------------------------------
// Caminho: src/react-app/lib/api/availability.ts
import { pb } from "./pocketbase";
import type { Appointment, ShopHour } from "@/shared/types";

/**
 * Busca os horários de funcionamento da loja
 */
export async function getShopHours(shopId: string): Promise<ShopHour[]> {
  try {
    return await pb.collection("shop_hours").getFullList<ShopHour>({
      filter: `shop_id = "${shopId}"`,
    });
  } catch (error) {
    console.error("Erro ao buscar horários:", error);
    return [];
  }
}

/**
 * Busca agendamentos de um profissional em uma data específica
 * para verificar conflitos.
 */
export async function getProfessionalAppointments(
  professionalId: string,
  date: string // Formato YYYY-MM-DD
): Promise<Appointment[]> {
  try {
    // O filtro busca agendamentos que começam no dia especificado
    // status != '0' (0 geralmente é cancelado)
    const startOfDay = `${date} 00:00:00`;
    const endOfDay = `${date} 23:59:59`;

    return await pb.collection("appointments").getFullList<Appointment>({
      filter: `barber_id = "${professionalId}" && start_time >= "${startOfDay}" && start_time <= "${endOfDay}" && status != '0'`,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return [];
  }
}
--- FIM DO ARQUIVO: src\react-app\lib\api\availability.ts ---


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
    owner_id: record.owner_id,
    logo: record.logo || undefined,
    address: record.address || "",
    phone: record.phone || "",
    is_active: record.is_active,
    created: record.created,
    updated: record.updated,
  };
}

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
  cnpj?: string; 
  owner_id: string;
}): Promise<Company> {
  try {
    const record = await pb.collection("companies").create({
      legal_name: data.legal_name,
      cnpj: data.cnpj ?? "",
      owner_id: data.owner_id,
      plan_status: "trial",
      trial_expires_at: "", 
      billing_cycle: "", 
      plan: "trial",
      max_shops: 1,
      max_professionals: 3,
    });

    // Vincula o usuário à empresa criada
    await pb.collection("users").update(data.owner_id, {
      company_id: record.id
    });

    return asCompany(record);
  } catch (err: any) {
    console.error("Erro detalhado do PocketBase:", err.data);
    throw err;
  }
}

/**
 * 2️⃣ Criar unidade (shop)
 * CORREÇÃO: Agora vincula o usuário à loja criada (shop_id)
 */
export async function onboardingCreateShop(data: {
  company_id: string;
  owner_id: string;
  name: string;
  slug: string;
  phone?: string;
  address?: string;
  segment_id?: string;
}): Promise<Shop> {
  const record = await pb.collection("shops").create({
    company_id: data.company_id,
    owner_id: data.owner_id,
    name: data.name,
    slug: data.slug,
    phone: data.phone ?? "",
    address: data.address ?? "",
    segment_id: data.segment_id ?? "",
    is_active: true,
  });

  // VINCULA O DONO À LOJA
  await pb.collection("users").update(data.owner_id, {
    shop_id: record.id
  });

  return asShop(record);
}

// Wrapper para criar Shop já com owner_id (usado no onboarding)
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

  // VINCULA O DONO À LOJA TAMBÉM AQUI
  await pb.collection("users").update(ownerId, {
    shop_id: record.id
  });

  return asShop(record);
}

/**
 * 3️⃣ Transformar o Dono em Profissional
 */
export async function onboardingCreateProfessional(data: {
  ownerId: string;
  shopId: string;
}): Promise<User> {
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
 * 6️⃣ Buscar profissionais por empresa
 */
export async function getProfessionalsByCompany(companyId: string): Promise<User[]> {
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
  } catch (err: any) {
    // CORREÇÃO: Ignora cancelamento automático para não deslogar
    if (err.status === 0 || err.isAbort) {
      return;
    }
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

  try {
    const record = await pb.collection("users").getOne<User>(model.id, {
      requestKey: `current_user_${model.id}`,
    });
    return record;
  } catch {
    return model as unknown as User;
  }
}

// ---------------------------
// Helpers multi-tenant básicos
// ---------------------------

export async function getMyCompanies(): Promise<Company[]> {
  const user = pb.authStore.model as AuthModel | null;
  if (!user) return [];

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
  // CORREÇÃO: O campo no banco é 'is_active', não 'status'
  const shops = await pb.collection("shops").getFullList({
    filter: `is_active = true`, 
    sort: "name",
  });

  const result: ShopWithCompany[] = [];

  for (const shop of shops) {
    try {
        const company = await pb.collection("companies").getOne(shop.company_id);
        result.push({ shop, company });
    } catch (err) {
        console.warn(`Empresa não encontrada para a loja ${shop.id}`, err);
        // Opcional: Adicionar mesmo sem empresa ou ignorar
        result.push({ shop, company: { legal_name: "Empresa não identificada" } });
    }
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
import { pb } from "./pocketbase";
import type { Service, Category } from "@/shared/types";

// --- SERVIÇOS ---

export async function getServicesByShop(shopId: string): Promise<Service[]> {
  return await pb.collection("services").getFullList<Service>({
    filter: `shop_id = "${shopId}" && is_active = true`,
    sort: "name",
    expand: "category_id"
  });
}

export async function createService(data: Partial<Service>): Promise<Service> {
  const record = await pb.collection("services").create(data);
  return record as unknown as Service;
}

export async function deleteService(id: string): Promise<boolean> {
  return await pb.collection("services").update(id, { is_active: false });
}

// --- CATEGORIAS (Adicionando aqui para facilitar importação) ---

export async function getCategoriesByShop(shopId: string): Promise<Category[]> {
  return await pb.collection("categories").getFullList<Category>({
    filter: `shop_id = "${shopId}"`,
    sort: "name",
  });
}

export async function createCategory(shopId: string, name: string): Promise<Category> {
  const record = await pb.collection("categories").create({
    shop_id: shopId,
    name: name
  });
  return record as unknown as Category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  return await pb.collection("categories").delete(id);
}
--- FIM DO ARQUIVO: src\react-app\lib\api\services.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\shop-hours.ts ---
Path: src\react-app\lib\api\shop-hours.ts
------------------------------
// Caminho: src/react-app/lib/api/shop-hours.ts
import { pb } from "./pocketbase";
import type { ShopHour, Weekday } from "@/shared/types";

// Helper para converter record em ShopHour
function asShopHour(record: any): ShopHour {
  return {
    id: record.id,
    shop_id: record.shop_id,
    company_id: record.company_id,
    weekday: record.weekday,
    start_time: record.start_time,
    end_time: record.end_time,
    is_closed: record.is_closed,
    created: record.created,
    updated: record.updated,
  };
}

/**
 * Busca todos os horários configurados para uma loja
 */
export async function getShopHours(shopId: string): Promise<ShopHour[]> {
  const records = await pb.collection("shop_hours").getFullList({
    filter: `shop_id = "${shopId}"`,
    sort: "weekday", // Podemos ordenar depois no front se precisar
  });
  return records.map(asShopHour);
}

/**
 * Salva ou Atualiza um horário de funcionamento
 * (Se já existir registro para aquele dia, atualiza. Se não, cria.)
 */
export async function upsertShopHour(data: {
  shopId: string;
  companyId: string;
  weekday: Weekday;
  startTime: string; // "09:00"
  endTime: string;   // "18:00"
  isClosed: boolean;
}): Promise<ShopHour> {
  
  // 1. Tenta achar registro existente para esse dia/loja
  let existingId: string | null = null;
  try {
    const found = await pb.collection("shop_hours").getFirstListItem(
      `shop_id="${data.shopId}" && weekday="${data.weekday}"`
    );
    existingId = found.id;
  } catch {
    // Não achou, tudo bem. Vamos criar.
  }

  const payload = {
    shop_id: data.shopId,
    company_id: data.companyId,
    weekday: data.weekday,
    start_time: data.startTime,
    end_time: data.endTime,
    is_closed: data.isClosed,
  };

  if (existingId) {
    // Atualiza
    const record = await pb.collection("shop_hours").update(existingId, payload);
    return asShopHour(record);
  } else {
    // Cria
    const record = await pb.collection("shop_hours").create(payload);
    return asShopHour(record);
  }
}

/**
 * Utilitário: Cria horários padrão para uma loja nova (Seg-Sex 09-18, Sab 09-14)
 */
export async function seedDefaultHours(shopId: string, companyId: string) {
  const defaults = [
    { day: "seg", start: "09:00", end: "18:00" },
    { day: "ter", start: "09:00", end: "18:00" },
    { day: "qua", start: "09:00", end: "18:00" },
    { day: "qui", start: "09:00", end: "18:00" },
    { day: "sex", start: "09:00", end: "18:00" },
    { day: "sab", start: "09:00", end: "14:00" },
    { day: "dom", start: "00:00", end: "00:00", closed: true },
  ];

  for (const item of defaults) {
    await upsertShopHour({
      shopId,
      companyId,
      weekday: item.day as Weekday,
      startTime: item.start,
      endTime: item.end,
      isClosed: item.closed || false,
    });
  }
}
--- FIM DO ARQUIVO: src\react-app\lib\api\shop-hours.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\shops.ts ---
Path: src\react-app\lib\api\shops.ts
------------------------------
import { pb } from "./pocketbase";
import type { Shop, PaymentMethod, Segment } from "@/shared/types";

// Buscar segmentos disponíveis (Barbearia, Salão, etc)
export async function getSegments(): Promise<Segment[]> {
  return await pb.collection("segments").getFullList({ sort: "name" });
}

// Buscar métodos de pagamento globais ou da loja
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  // Aqui buscamos todos os métodos possíveis cadastrados no sistema para o usuário selecionar
  return await pb.collection("payment_methods").getFullList({ 
    filter: "is_active = true",
    sort: "name" 
  });
}

// Atualizar dados da loja
export async function updateShop(shopId: string, data: Partial<Shop>): Promise<Shop> {
  const record = await pb.collection("shops").update(shopId, data);
  return record as unknown as Shop;
}
--- FIM DO ARQUIVO: src\react-app\lib\api\shops.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\api\staff.ts ---
Path: src\react-app\lib\api\staff.ts
------------------------------
import { pb } from "./pocketbase";
import type { User } from "@/shared/types";

// Função auxiliar interna
function asUser(record: any): User {
    return {
      id: record.id,
      email: record.email,
      name: record.name,
      role: record.role,
      phone: record.phone,
      avatar: record.avatar ? pb.files.getUrl(record, record.avatar) : undefined,
      company_id: record.company_id,
      shop_id: record.shop_id,
      is_professional: record.is_professional,
      created: record.created,
      updated: record.updated,
    };
  }

export async function getProfessionalsByShop(shopId: string): Promise<User[]> {
  const records = await pb.collection("users").getFullList({
    filter: `shop_id = "${shopId}" && is_professional = true`,
    sort: "name",
  });
  return records.map(asUser);
}

// Criação simplificada de profissional (simulando convite)
export async function createProfessionalUser(data: {
    email: string;
    name: string;
    company_id: string;
    shop_id: string;
}): Promise<User> {
    // Senha provisória padrão
    const tempPassword = "Mudar@123"; 
    
    const record = await pb.collection("users").create({
        email: data.email,
        emailVisibility: true,
        password: tempPassword,
        passwordConfirm: tempPassword,
        name: data.name,
        role: "staff", // ou 'dono' se for sócio
        is_professional: true,
        company_id: data.company_id,
        shop_id: data.shop_id
    });
    
    return asUser(record);
}

export async function removeProfessional(userId: string): Promise<boolean> {
    // Apenas remove a flag, não apaga o user para manter histórico
    await pb.collection("users").update(userId, { is_professional: false });
    return true;
}
--- FIM DO ARQUIVO: src\react-app\lib\api\staff.ts ---


--- INICIO DO ARQUIVO: src\react-app\lib\utils\slots.ts ---
Path: src\react-app\lib\utils\slots.ts
------------------------------
// Caminho: src/react-app/lib/utils/slots.ts
import type { ShopHour, Appointment, TimeSlot } from "@/shared/types";

// Helper: converte "09:30" para minutos (570)
function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Helper: converte minutos (570) para "09:30"
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const WEEKDAY_MAP: Record<number, string> = {
  0: "dom", 1: "seg", 2: "ter", 3: "qua", 4: "qui", 5: "sex", 6: "sab",
};

/**
 * GERA OS SLOTS DISPONÍVEIS
 */
export function generateSlots(
  dateStr: string, // YYYY-MM-DD
  serviceDuration: number,
  shopHours: ShopHour[],
  existingAppointments: Appointment[]
): TimeSlot[] {
  const dateObj = new Date(dateStr + "T00:00:00");
  const weekday = WEEKDAY_MAP[dateObj.getDay()];

  // 1. Achar horário da loja para hoje
  const hours = shopHours.find((h) => h.weekday === weekday);

  // Se loja fechada ou sem horário cadastrado
  if (!hours || hours.is_closed || !hours.start_time || !hours.end_time) {
    return [];
  }

  const startMin = timeToMinutes(hours.start_time);
  const endMin = timeToMinutes(hours.end_time);
  const slots: TimeSlot[] = [];

  // 2. Loop para criar slots (ex: 09:00, 09:30, 10:00...)
  for (let current = startMin; current + serviceDuration <= endMin; current += serviceDuration) {
    const timeString = minutesToTime(current);
    const slotStartISO = `${dateStr} ${timeString}:00`;
    
    // Calcular fim do slot
    const slotEndMin = current + serviceDuration;
    const slotEndTimeString = minutesToTime(slotEndMin);
    const slotEndISO = `${dateStr} ${slotEndTimeString}:00`;

    // 3. Verificar colisão com agendamentos existentes
    const isBusy = existingAppointments.some((appt) => {
      const apptStart = new Date(appt.start_time).getTime(); // Assumindo que vem UTC ou ISO correto
      // Pequeno ajuste: appointments no PB são salvos como string UTC.
      // Simplificação para este passo: vamos comparar strings de hora se possível, 
      // mas o ideal é comparar timestamps completos.
      
      const thisSlotStart = new Date(slotStartISO).getTime();
      const thisSlotEnd = new Date(slotEndISO).getTime();

      // Se o agendamento já existe, ele bloqueia o slot?
      // Lógica básica de overlap
      return (apptStart >= thisSlotStart && apptStart < thisSlotEnd);
    });

    slots.push({
      time: timeString,
      startISO: slotStartISO,
      endISO: slotEndISO,
      isAvailable: !isBusy,
    });
  }

  return slots;
}
--- FIM DO ARQUIVO: src\react-app\lib\utils\slots.ts ---


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
      await login(email, password); 

      await refreshTenant(); 

      if (!user) {
        // user vem do hook, mas como o login atualiza o estado assincronamente,
        // confiamos que se não deu erro no await login, o contexto vai atualizar.
        // Se precisarmos do user imediato, o login deveria retorná-lo (ajustamos no AuthContext antes)
      }

      // Pequeno delay para garantir que o estado do AuthContext propagou se necessário,
      // ou confiamos na lógica de renderização.
      // O ideal é verificar o user atualizado ou o retorno da função login.
      
      // Vamos usar a lógica de redirecionamento baseada no user retornado pelo AuthContext
      // Porém, dentro da função, o 'user' do hook ainda é o valor antigo (closure).
      // O correto seria o login retornar o user. O AuthContext que fizemos retorna.
      
      // Vamos assumir o sucesso e redirecionar baseados no que sabemos ou buscar o user fresco.
      // Como o AuthContext.tsx retorna o user no login, vamos pegar o resultado da promise:
      
      // OBS: O AuthContext que te passei retorna Promise<User>, então:
      // const loggedUser = await login(email, password); 
      // Mas aqui no código atual está desestruturado. Se o seu AuthContext retorna User, ótimo.
      // Se não, vamos confiar no refresh da página ou redirecionar para uma rota base que decide.
      
      // CORREÇÃO CRÍTICA: Rota correta é /owner/dashboard
      // Para garantir, vamos recarregar o user do tenant (que já tem os dados frescos)
      
      // Simplificação segura:
      // Se passou pelo await login sem erro, estamos logados.
      
      // A lógica de roteamento idealmente fica no componente, mas precisamos saber o role.
      // Vou usar uma verificação direta no window ou confiar que o contexto vai atualizar e o router vai lidar.
      // Mas para o UX imediato:
      
      // Vamos tentar navegar para a raiz protegida e deixar o ProtectedRoute resolver ou 
      // forçar a navegação se soubermos o role. 
      // Como não temos o user atualizado nesta função (stale state), vamos fazer um fetch rápido ou navegar para /
      
      navigate("/"); // O AppRouter ou a Landing vai redirecionar se estiver logado? 
                     // Melhor: vamos navegar direto para onde achamos que deve ir.
      
      // Se for dono, vai para dashboard. Se não tiver company_id, o ProtectedRoute ou a página vão jogar pro onboarding.
      // Mas o seu código original tentava ser esperto. Vamos manter a lógica mas corrigir a URL.
      
      // Assumindo que você é dono (fluxo principal que estamos testando):
      navigate("/owner/dashboard", { replace: true });

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
      </div>
    </div>
  );
};

export default LoginPage;
--- FIM DO ARQUIVO: src\react-app\pages\auth\LoginPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\auth\RegisterPage.tsx ---
Path: src\react-app\pages\auth\RegisterPage.tsx
------------------------------
// Caminho: src/react-app/pages/auth/RegisterPage.tsx

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
        
        if (cancelled) return;

        let preselected = null;

        if (shopId) {
          preselected = await getShopById(shopId);
        } else if (slug) {
          preselected = await getShopBySlug(slug);
        }

        setShops(allShops);

        if (preselected) {
          setSelectedShopId(preselected.id);
        } else if (allShops.length > 0) {
          setSelectedShopId(allShops[0].shop.id);
        }
      } catch (err: any) {
        if (err.status !== 0 && !cancelled) {
          console.error("Erro ao carregar lojas:", err);
          setError("Não foi possível carregar as unidades disponíveis.");
        }
      } finally {
        if (!cancelled) setLoadingShops(false);
      }
    }

    if (mode === "client") {
        load();
    }

    return () => {
      cancelled = true;
    };
  }, [searchParams, mode]);

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

        await login(email.trim(), password);
        await reloadTenants();
        navigate("/onboarding", { replace: true });
        return;
      }

      /* ------------------- CLIENTE ------------------- */
      if (!selectedShop) throw new Error("Dados de unidade inválidos.");

      const companyId = selectedShop.shop.company_id;
      const shopId = selectedShop.shop.id;

      const existingUser = await findUserByEmail(email.trim());

      if (existingUser) {
        setPendingCompanyId(companyId);
        setPendingShopId(shopId);
        setShowModal(true);
        return;
      }

      await registerClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        companyId,
        shopId,
      });

      await login(email.trim(), password);
      const slug = selectedShop.shop.slug;
      navigate(`/book/${slug}`, { replace: true });

    } catch (err: any) {
      console.error(err);

      // CORREÇÃO: Ignorar erro de cancelamento automático (status 0)
      if (err.status === 0 || err.isAbort) {
        // Se cancelou, assumimos que o registro/login funcionou e redirecionamos manualmente
        if (mode === "owner") {
          navigate("/onboarding", { replace: true });
        } else if (selectedShop) {
          navigate(`/book/${selectedShop.shop.slug}`, { replace: true });
        }
        return;
      }

      setError(
        err?.message ??
        "Não foi possível concluir o cadastro. Tente novamente em instantes."
      );
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

      await registerClient({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        companyId: pendingCompanyId,
        shopId: pendingShopId,
      });

      await login(email.trim(), password);
      const slug = selectedShop.shop.slug;
      navigate(`/book/${slug}`, { replace: true });
    } catch (err: any) {
      console.error(err);
      
      // Correção também no modal
      if (err.status === 0 || err.isAbort) {
        const slug = selectedShop.shop.slug;
        navigate(`/book/${slug}`, { replace: true });
        return;
      }

      setError(
        err?.message ??
        "Não foi possível concluir o cadastro. Tente novamente."
      );
      setSubmitting(false);
    } finally {
      if (!submitting) setShowModal(false); // Só fecha se não foi navegação
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
                  <div className="text-xs text-slate-400">Nenhuma unidade disponível no momento.</div>
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
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 shadow-lg shadow-emerald-500/40 transition"
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


--- INICIO DO ARQUIVO: src\react-app\pages\booking\BookPage.tsx ---
Path: src\react-app\pages\booking\BookPage.tsx
------------------------------
// Caminho: src/react-app/pages/booking/BookPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopBySlug } from "@/react-app/lib/api/register";
import type { Shop, Service, User } from "@/shared/types";

// Import dos passos (Steps)
import StepService from "@/react-app/components/booking/StepService";
import StepProfessional from "@/react-app/components/booking/StepProfessional";
import StepDateTime from "@/react-app/components/booking/StepDateTime";
import StepConfirm from "@/react-app/components/booking/StepConfirm";

export default function BookPage() {
  const { slug } = useParams<{ slug: string }>();

  // Estados Globais do Agendamento
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do Wizard (Passo a Passo)
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // 1. Carrega a Loja pelo Slug ao abrir a página
  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getShopBySlug(slug);
        if (!data) {
          setError("Unidade não encontrada ou endereço incorreto.");
        } else {
          setShop(data);
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar a unidade. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  // Renderização de Erro/Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="animate-pulse">Carregando agendamento...</div>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-red-400 mb-2">● Unidade não localizada</div>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  // Renderização do Wizard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-6 px-4 md:py-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Cabeçalho da Loja */}
        <div className="mb-8 text-center space-y-2">
          {shop.logo && (
             <img src={shop.logo} alt="Logo" className="w-16 h-16 mx-auto rounded-full object-cover bg-slate-800" />
          )}
          <h1 className="text-2xl md:text-3xl font-bold">{shop.name}</h1>
          <p className="text-slate-400 text-sm">{shop.address || "Endereço não informado"}</p>
        </div>

        {/* Área do Conteúdo (Passos) */}
        <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
          
          {/* PASSO 1: SERVIÇO */}
          {step === 1 && (
            <StepService
              shop={shop}
              service={selectedService}
              onChange={(data) => {
                if (data.service !== undefined) setSelectedService(data.service);
              }}
              onNext={() => setStep(2)}
            />
          )}

          {/* PASSO 2: PROFISSIONAL */}
          {step === 2 && selectedService && (
            <StepProfessional
              shop={shop}
              service={selectedService}
              professional={selectedProfessional}
              onChange={(data) => {
                if (data.professional !== undefined) setSelectedProfessional(data.professional);
              }}
              onBack={() => setStep(1)}
              onNext={() => {
                setStep(3);
              }}
            />
          )}

          {/* PASSO 3: DATA E HORA */}
          {step === 3 && selectedService && selectedProfessional && (
            <StepDateTime
              shop={shop}
              service={selectedService}
              professional={selectedProfessional}
              onBack={() => setStep(2)}
              onNext={(date, time) => {
                setSelectedDate(date);
                setSelectedTime(time);
                setStep(4); 
              }}
            />
          )}

          {/* PASSO 4: CONFIRMAÇÃO */}
          {step === 4 && selectedService && selectedProfessional && selectedDate && selectedTime && (
            <StepConfirm
              shop={shop}
              service={selectedService}
              // O '!' aqui garante ao TypeScript que não é nulo, pois o IF acima já verificou
              professional={selectedProfessional}
              date={selectedDate}
              time={selectedTime}
              onBack={() => setStep(3)}
            />
          )}

        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-600">
            Powered by TeaAgendei
          </p>
        </div>
      </div>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\pages\booking\BookPage.tsx ---


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
import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { fetchTodayKpis, fetchTodayBookings, type TodayKpis, type TodayBooking } from "@/react-app/lib/api/dashboard";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  const { currentShop } = useTenant();
  
  const [kpis, setKpis] = useState<TodayKpis | null>(null);
  const [bookings, setBookings] = useState<TodayBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentShop) return;

    async function load() {
      setLoading(true);
      try {
        const [kpiData, bookingData] = await Promise.all([
          fetchTodayKpis(currentShop!.id),
          fetchTodayBookings(currentShop!.id)
        ]);
        setKpis(kpiData);
        setBookings(bookingData);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [currentShop?.id]);

  if (!currentShop) {
    return <div className="text-slate-400">Nenhuma unidade selecionada.</div>;
  }

  // Formatador de Moeda
  const formatMoney = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
        <p className="text-slate-400">Resumo da operação hoje em {currentShop.name}</p>
      </div>

      {/* CARDS DE KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 text-6xl group-hover:scale-110 transition">📅</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Agendamentos Hoje</p>
          <h3 className="text-3xl font-bold text-white">
            {loading ? "..." : kpis?.total_bookings || 0}
          </h3>
        </div>

        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-sky-500 text-6xl group-hover:scale-110 transition">👥</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Clientes Únicos</p>
          <h3 className="text-3xl font-bold text-white">
            {loading ? "..." : kpis?.unique_clients || 0}
          </h3>
        </div>

        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-violet-500 text-6xl group-hover:scale-110 transition">💰</div>
          <p className="text-sm text-slate-400 font-medium mb-1">Faturamento Previsto</p>
          <h3 className="text-3xl font-bold text-emerald-400">
            {loading ? "..." : formatMoney(kpis?.total_value || 0)}
          </h3>
        </div>
      </div>

      {/* LISTA DE PRÓXIMOS AGENDAMENTOS */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-semibold text-white">Próximos atendimentos</h3>
          <Link to="/staff/agenda" className="text-xs text-emerald-400 hover:text-emerald-300">Ver agenda completa →</Link>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-slate-500">Carregando...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 mb-2">Nenhum agendamento para hoje.</p>
            <p className="text-xs text-slate-600">Compartilhe seu link: /book/{currentShop.slug}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-800 text-slate-200 px-3 py-2 rounded-lg text-sm font-bold font-mono">
                    {b.time.slice(11, 16)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">{b.client_name}</p>
                    <p className="text-xs text-slate-500">{b.service_name} • com {b.professional_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-sky-500/10 text-sky-400">
                    Confirmado
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\pages\dashboard\DashboardHome.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\onboarding\CompanyStep.tsx ---
Path: src\react-app\pages\onboarding\CompanyStep.tsx
------------------------------
// Caminho: src/react-app/pages/onboarding/CompanyStep.tsx
import { FormEvent, useState } from "react";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { onboardingCreateCompany } from "@/react-app/lib/api/onboarding";

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
        Você precisa estar autenticado para continuar.
      </div>
    );
  }

  // Remove formatação para enviar limpo
  const cleanCnpj = (value: string) => value.replace(/\D/g, "");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("Sessão inválida. Faça login novamente.");
      return;
    }

    if (!legalName.trim()) {
      setError("Informe o nome da sua empresa.");
      return;
    }

    const rawCnpj = cleanCnpj(cnpj);
    if (cnpj && rawCnpj.length !== 14) {
        setError("O CNPJ deve conter exatamente 14 números.");
        return;
    }

    setSubmitting(true);

    try {
      await onboardingCreateCompany({
        owner_id: user.id,
        legal_name: legalName.trim(),
        cnpj: rawCnpj || undefined, 
      });

      // Tenta recarregar. Se a navegação for mais rápida e cancelar isso,
      // o erro será capturado abaixo.
      await reloadTenants();
      
      onDone();
    } catch (err: any) {
      console.error(err);
      
      // CORREÇÃO: Ignora erro de cancelamento (status 0 ou isAbort)
      // Isso acontece porque navegamos para a próxima página antes do reload terminar
      if (err.status === 0 || err.isAbort) {
        onDone(); // Segue o fluxo, pois o registro foi criado
        return;
      }

      if (err.data?.cnpj) {
         setError("CNPJ inválido ou já cadastrado.");
      } else {
         setError(err?.message || "Não foi possível criar a empresa.");
         // Só destrava o botão se for um erro real que impeça o avanço
         setSubmitting(false); 
      }
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
            placeholder="00.000.000/0000-00 (Apenas números se preferir)"
            maxLength={18}
          />
          <p className="text-[10px] text-slate-500">Digite apenas números ou use formatação padrão.</p>
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
// Caminho: src/react-app/pages/onboarding/OnboardingRouter.tsx
import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import CompanyStep from "./CompanyStep";
import ShopStep from "./ShopStep";
import OwnerProfessionalStep from "./OwnerProfessionalStep";
import DoneStep from "./DoneStep";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { useTenant } from "@/react-app/contexts/TenantContext";

export default function OnboardingRouter() {
  const { user } = useAuth();
  const { currentCompany, currentShop } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  // Segurança extra (só donos)
  if (!user || user.role !== "dono") {
    return <Navigate to="/login" replace />;
  }

  // Lógica Inteligente de Redirecionamento
  // Verifica o progresso e redireciona se o usuário cair no passo errado
  useEffect(() => {
    // Se estou na raiz (CompanyStep) mas já tenho empresa -> vai para Shop
    if (location.pathname === "/onboarding" || location.pathname === "/onboarding/") {
      if (currentCompany && !currentShop) {
        navigate("shop", { replace: true });
      } else if (currentCompany && currentShop) {
        navigate("owner-pro", { replace: true });
      }
    }

    // Se estou no ShopStep mas já tenho Shop -> vai para OwnerPro
    if (location.pathname.includes("/shop")) {
      if (currentShop) {
        navigate("owner-pro", { replace: true });
      }
    }
  }, [currentCompany, currentShop, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Fundo decorativo simples para o onboarding */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative z-10 w-full max-w-lg">
        <Routes>
          {/* Passo 1: Empresa -> Vai para /shop */}
          <Route 
            path="/" 
            element={<CompanyStep onDone={() => navigate("shop")} />} 
          />

          {/* Passo 2: Unidade -> Vai para /owner-pro */}
          <Route 
            path="/shop" 
            element={<ShopStep onDone={() => navigate("owner-pro")} />} 
          />

          {/* Passo 3: Perfil Profissional -> Vai para /done */}
          <Route 
            path="/owner-pro" 
            element={<OwnerProfessionalStep onDone={() => navigate("done")} />} 
          />

          {/* Passo Final: Conclusão */}
          <Route path="/done" element={<DoneStep />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </div>
    </div>
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

  // Removido segmentId temporariamente para evitar erro 400 (precisa ser um ID válido)

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gera slug automaticamente
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

  // Proteção visual (Early return)
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

    // --- CORREÇÃO DO ERRO DE TYPESCRIPT AQUI ---
    // O TypeScript precisa garantir novamente que user e currentCompany não são nulos
    // dentro desta função específica.
    if (!user || !currentCompany) {
      setError("Erro de sessão. Recarregue a página.");
      return;
    }

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
      segment_id: undefined,
    };

    setSubmitting(true);

    try {
      await createInitialShop(currentCompany.id, user.id, {
        name: payload.name,
        slug: payload.slug,
        phone: payload.phone,
        address: payload.address,
      });

      // Aguarda o reload
      await reloadTenants();

      // Chama o onDone que agora (no Router) faz o navigate
      onDone();
    } catch (err: any) {
      console.error("Erro ao criar Shop:", err);

      // Tratamento para cancelamento automático
      if (err.status === 0 || err.isAbort) {
        // Se cancelou, provavelmente funcionou o request mas o navegador abortou
        // Vamos forçar a ida para o próximo passo
        onDone();
        return;
      }

      // Tratamento detalhado do erro 400
      let msg = "Não foi possível criar a unidade.";

      if (err.data) {
        const keys = Object.keys(err.data);
        if (keys.length > 0) {
          const field = keys[0];
          const errorMsg = err.data[field]?.message;
          msg = `Erro no campo '${field}': ${errorMsg}`;
        }
      }

      if (err.data?.slug) {
        msg = "Este link (slug) já está em uso. Escolha outro.";
      }

      setError(msg);
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
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-black/40 border border-white/10 focus-within:ring-2 focus-within:ring-emerald-400/80">
            <span className="text-slate-500 text-sm">/book/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value.toLowerCase().replace(/\s/g, "-"))
              }
              className="flex-1 bg-transparent text-sm text-emerald-400 font-medium placeholder-slate-600 focus:outline-none"
              placeholder="sua-unidade"
            />
          </div>
          <p className="text-[10px] text-slate-500">
            Link único para seus clientes agendarem.
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


--- INICIO DO ARQUIVO: src\react-app\pages\owner\ServicesPage.tsx ---
Path: src\react-app\pages\owner\ServicesPage.tsx
------------------------------
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
    loadData();
  }, [currentShop?.id]);

  async function loadData() {
    if (!currentShop) return;
    setLoading(true);
    const [srv, cat] = await Promise.all([
      getServicesByShop(currentShop.id),
      getCategoriesByShop(currentShop.id)
    ]);
    setServices(srv);
    setCategories(cat);
    setLoading(false);
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
      loadData();
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
      loadData();
    } catch (err) {
      alert("Erro ao criar categoria");
    }
  }

  async function handleDeleteService(id: string) {
    if (confirm("Desativar este serviço?")) {
      await deleteService(id);
      loadData();
    }
  }

  async function handleDeleteCategory(id: string) {
    if (confirm("Apagar categoria?")) {
      await deleteCategory(id);
      loadData();
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
--- FIM DO ARQUIVO: src\react-app\pages\owner\ServicesPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\owner\SettingsPage.tsx ---
Path: src\react-app\pages\owner\SettingsPage.tsx
------------------------------
import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import {
  getShopHours,
  upsertShopHour,
  seedDefaultHours,
} from "@/react-app/lib/api/shop-hours";
import {
  getSegments,
  getPaymentMethods,
  updateShop,
} from "@/react-app/lib/api/shops";
import { pb } from "@/react-app/lib/api/pocketbase";
import type { ShopHour, Weekday, Segment, PaymentMethod } from "@/shared/types";

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "dom", label: "Domingo" },
  { key: "seg", label: "Segunda" },
  { key: "ter", label: "Terça" },
  { key: "qua", label: "Quarta" },
  { key: "qui", label: "Quinta" },
  { key: "sex", label: "Sexta" },
  { key: "sab", label: "Sábado" },
];

type Tab = "hours" | "details" | "finance";

export default function SettingsPage() {
  const { currentShop, currentCompany, setCurrentShop } = useTenant();
  const [activeTab, setActiveTab] = useState<Tab>("hours");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --- DADOS CARREGADOS ---
  const [hours, setHours] = useState<ShopHour[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [allPaymentMethods, setAllPaymentMethods] = useState<PaymentMethod[]>(
    []
  );

  // --- FORMULÁRIO DADOS DA LOJA ---
  const [shopName, setShopName] = useState("");
  const [shopSlug, setShopSlug] = useState(""); // Novo
  const [shopDescription, setShopDescription] = useState(""); // Novo
  const [shopPhone, setShopPhone] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [minAdvance, setMinAdvance] = useState(""); // Novo (minutos)
  const [maxAdvance, setMaxAdvance] = useState(""); // Novo (dias ou minutos, vamos usar dias no UI e converter)

  // Logo
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // --- FORMULÁRIO FINANCEIRO ---
  const [pixKey, setPixKey] = useState("");
  const [pixKeyType, setPixKeyType] = useState("cpf");
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  useEffect(() => {
    if (currentShop) {
      loadData();
      // Preencher formulários
      setShopName(currentShop.name);
      setShopSlug(currentShop.slug);
      setShopDescription(currentShop.description || "");
      setShopPhone(currentShop.phone || "");
      setShopAddress(currentShop.address || "");
      setSelectedSegment(currentShop.segment_id || "");

      // Regras de tempo (Banco guarda minutos/dias conforme sua lógica, vamos assumir minutos brutos)
      // min_advance_time (minutos)
      setMinAdvance(currentShop.min_advance_time?.toString() || "30");
      // max_advance_time (dias convertidos em minutos ou dias direto? Vamos usar dias no front)
      // Se no banco for dias, ok. Se for minutos, converta. Pelo schema é Number genérico.
      // Vamos assumir que max_advance_time está em DIAS para facilitar.
      setMaxAdvance(currentShop.max_advance_time?.toString() || "30");

      setPixKey(currentShop.pix_key || "");
      setPixKeyType(currentShop.pix_key_type || "cpf");
      setSelectedPayments(currentShop.accepted_payment_methods || []);

      // Logo Preview
      if (currentShop.logo) {
        // Gera URL da imagem no PocketBase
        const url = pb.files.getUrl(currentShop, currentShop.logo);
        setLogoPreview(url);
      } else {
        setLogoPreview(null);
      }
    }
  }, [currentShop?.id]);

  async function loadData() {
    if (!currentShop) return;
    setLoading(true);
    try {
      const [h, s, p] = await Promise.all([
        getShopHours(currentShop.id),
        getSegments(),
        getPaymentMethods(),
      ]);
      setHours(h);
      setSegments(s);
      setAllPaymentMethods(p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // --- HANDLERS DE SALVAMENTO ---

  async function handleSaveDetails() {
    if (!currentShop) return;
    setSaving(true);
    try {
      // Prepara payload
      // Nota: PocketBase aceita File direto no payload se usarmos FormData,
      // ou objeto simples se o SDK tratar (o JS SDK trata).
      const payload: any = {
        name: shopName,
        slug: shopSlug,
        description: shopDescription,
        phone: shopPhone,
        address: shopAddress,
        segment_id: selectedSegment,
        min_advance_time: Number(minAdvance), // Minutos
        max_advance_time: Number(maxAdvance), // Dias
      };

      // Se tiver nova logo, anexa
      if (logoFile) {
        payload.logo = logoFile;
      }

      const updated = await updateShop(currentShop.id, payload);
      setCurrentShop(updated);
      alert("Dados da loja atualizados!");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao salvar. Verifique se o Slug já existe.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveFinance() {
    if (!currentShop) return;
    setSaving(true);
    try {
      const updated = await updateShop(currentShop.id, {
        pix_key: pixKey,
        pix_key_type: pixKeyType as any,
        accepted_payment_methods: selectedPayments,
      });
      setCurrentShop(updated);
      alert("Configurações financeiras salvas!");
    } catch (error) {
      alert("Erro ao salvar financeiro.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveHour(
    day: Weekday,
    start: string,
    end: string,
    closed: boolean
  ) {
    if (!currentShop || !currentCompany) return;
    setSaving(true);
    await upsertShopHour({
      shopId: currentShop.id,
      companyId: currentCompany.id,
      weekday: day,
      startTime: start,
      endTime: end,
      isClosed: closed,
    });
    const newHours = await getShopHours(currentShop.id);
    setHours(newHours);
    setSaving(false);
  }

  async function handleSeedHours() {
    if (!currentShop || !currentCompany) return;
    if (!confirm("Resetar horários para o padrão?")) return;
    setSaving(true);
    await seedDefaultHours(currentShop.id, currentCompany.id);
    loadData();
    setSaving(false);
  }

  // Preview de imagem local antes de subir
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Toggle checkbox de pagamento
  const togglePayment = (id: string) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  if (!currentShop) return <div>Carregando...</div>;

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-white">Configurações</h1>

      {/* TABS */}
      <div className="flex gap-4 border-b border-white/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab("hours")}
          className={`pb-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === "hours"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400"
          }`}
        >
          Horários
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`pb-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === "details"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400"
          }`}
        >
          Dados da Loja
        </button>
        <button
          onClick={() => setActiveTab("finance")}
          className={`pb-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === "finance"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400"
          }`}
        >
          Financeiro & Pix
        </button>
      </div>

      {loading ? (
        <div className="text-slate-500 animate-pulse">Carregando dados...</div>
      ) : (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
          {/* ================= ABA HORÁRIOS ================= */}
          {activeTab === "hours" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Horários de Funcionamento
                </h3>
                {hours.length === 0 && (
                  <button
                    onClick={handleSeedHours}
                    className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded hover:bg-emerald-500/20"
                  >
                    Preencher Padrão
                  </button>
                )}
              </div>
              {WEEKDAYS.map((day) => {
                const config = hours.find((h) => h.weekday === day.key);
                const isClosed = config?.is_closed ?? false;
                const start = config?.start_time || "09:00";
                const end = config?.end_time || "18:00";
                return (
                  <div
                    key={day.key}
                    className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-3 border-b border-white/5 last:border-0"
                  >
                    <div className="w-24 text-slate-300 font-medium capitalize">
                      {day.label}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        disabled={isClosed || saving}
                        value={start}
                        onChange={(e) =>
                          handleSaveHour(day.key, e.target.value, end, isClosed)
                        }
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm text-white disabled:opacity-30 focus:border-emerald-500 outline-none"
                      />
                      <span className="text-slate-500">-</span>
                      <input
                        type="time"
                        disabled={isClosed || saving}
                        value={end}
                        onChange={(e) =>
                          handleSaveHour(
                            day.key,
                            start,
                            e.target.value,
                            isClosed
                          )
                        }
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm text-white disabled:opacity-30 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer ml-auto hover:text-white">
                      <input
                        type="checkbox"
                        checked={isClosed}
                        disabled={saving}
                        onChange={(e) =>
                          handleSaveHour(day.key, start, end, e.target.checked)
                        }
                        className="rounded bg-black/40 border-white/20 text-red-500 focus:ring-red-500"
                      />
                      Fechado
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= ABA DADOS DA LOJA ================= */}
          {activeTab === "details" && (
            <div className="space-y-8 max-w-2xl">
              {/* Seção 1: Identidade */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                  Identidade
                </h3>

                {/* Upload de Logo */}
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-slate-800 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-500 text-center">
                        Sem
                        <br />
                        Logo
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Logotipo da Unidade
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Recomendado: 200x200px (JPG, PNG)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Nome da Unidade
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Link Personalizado (Slug)
                    </label>
                    <div className="flex items-center">
                      <span className="bg-slate-800 border border-white/10 border-r-0 rounded-l-lg p-2.5 text-slate-500 text-xs">
                        /book/
                      </span>
                      <input
                        className="w-full bg-black/30 border border-white/10 rounded-r-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                        value={shopSlug}
                        onChange={(e) =>
                          setShopSlug(
                            e.target.value.toLowerCase().replace(/\s+/g, "-")
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Descrição
                  </label>
                  <textarea
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                    rows={3}
                    placeholder="Conte um pouco sobre sua unidade..."
                    value={shopDescription}
                    onChange={(e) => setShopDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Segmento
                  </label>
                  <select
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-slate-300 focus:border-emerald-500 outline-none"
                    value={selectedSegment}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {segments.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seção 2: Contato e Endereço */}
              <div className="space-y-4 border-t border-white/5 pt-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                  Localização
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Telefone / WhatsApp
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      value={shopPhone}
                      onChange={(e) => setShopPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Endereço
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      value={shopAddress}
                      onChange={(e) => setShopAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Seção 3: Regras de Agendamento */}
              <div className="space-y-4 border-t border-white/5 pt-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                  Regras de Agenda
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Antecedência Mínima (minutos)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      placeholder="Ex: 30 (não agendar em cima da hora)"
                      value={minAdvance}
                      onChange={(e) => setMinAdvance(e.target.value)}
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Tempo mínimo antes do horário para permitir agendamento.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Agenda Aberta (dias)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      placeholder="Ex: 30 (abrir agenda para 1 mês)"
                      value={maxAdvance}
                      onChange={(e) => setMaxAdvance(e.target.value)}
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Quantos dias à frente o cliente pode ver.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveDetails}
                  disabled={saving}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20"
                >
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </div>
          )}

          {/* ================= ABA FINANCEIRO ================= */}
          {activeTab === "finance" && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3">
                  Configuração Pix
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div className="col-span-1">
                    <label className="block text-xs text-slate-400 mb-1">
                      Tipo de Chave
                    </label>
                    <select
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-slate-300 focus:border-emerald-500 outline-none"
                      value={pixKeyType}
                      onChange={(e) => setPixKeyType(e.target.value)}
                    >
                      <option value="cpf">CPF</option>
                      <option value="cnpj">CNPJ</option>
                      <option value="email">E-mail</option>
                      <option value="telefone">Telefone</option>
                      <option value="aleatoria">Aleatória</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-slate-400 mb-1">
                      Chave Pix
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      placeholder="Sua chave aqui"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3">
                  Métodos de Pagamento Aceitos
                </h3>
                {allPaymentMethods.length === 0 && (
                  <p className="text-xs text-slate-500">
                    Nenhum método cadastrado no sistema.
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allPaymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        selectedPayments.includes(pm.id)
                          ? "bg-emerald-500/10 border-emerald-500/50"
                          : "bg-black/20 border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(pm.id)}
                        onChange={() => togglePayment(pm.id)}
                        className="rounded bg-black/40 border-white/20 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span
                        className={
                          selectedPayments.includes(pm.id)
                            ? "text-emerald-400"
                            : "text-slate-400"
                        }
                      >
                        {pm.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveFinance}
                  disabled={saving}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20"
                >
                  {saving ? "Salvando..." : "Salvar Configurações"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

--- FIM DO ARQUIVO: src\react-app\pages\owner\SettingsPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\owner\ShopsPage.tsx ---
Path: src\react-app\pages\owner\ShopsPage.tsx
------------------------------
import { useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { useNavigate } from "react-router-dom";
import Modal from "@/react-app/components/common/Modal";
import { createInitialShop } from "@/react-app/lib/api/onboarding";
import { useAuth } from "@/react-app/contexts/AuthContext";

export default function ShopsPage() {
  const { shops, currentShop, setCurrentShop, currentCompany, reloadTenants } = useTenant();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSwitch = (shopId: string) => {
    const found = shops.find(s => s.id === shopId);
    if (found) setCurrentShop(found);
  };

  const handleCreate = async () => {
     if (!user || !currentCompany) return;
     try {
        await createInitialShop(currentCompany.id, user.id, { name, slug });
        await reloadTenants();
        setModalOpen(false);
        setName("");
        setSlug("");
     } catch(e) {
        alert("Erro ao criar loja. Verifique se o slug é único.");
     }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Minhas Unidades</h1>
        <button onClick={() => setModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-xl">
          + Nova Unidade
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
         {shops.map(shop => {
            const isActive = shop.id === currentShop?.id;
            return (
                <div key={shop.id} className={`p-6 rounded-2xl border transition ${isActive ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-900 border-white/5'}`}>
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="text-lg font-bold text-white">{shop.name}</h3>
                         <p className="text-sm text-slate-400">/book/{shop.slug}</p>
                      </div>
                      {isActive ? (
                          <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded">Selecionada</span>
                      ) : (
                          <button onClick={() => handleSwitch(shop.id)} className="text-sm text-emerald-400 hover:underline">
                             Selecionar
                          </button>
                      )}
                   </div>
                   <div className="mt-4 flex gap-2">
                      <a href={`/book/${shop.slug}`} target="_blank" className="text-xs bg-black/30 px-3 py-1.5 rounded border border-white/10 text-slate-300 hover:text-white">
                         Ver página pública ↗
                      </a>
                      <button onClick={() => navigate("/owner/settings")} className="text-xs bg-black/30 px-3 py-1.5 rounded border border-white/10 text-slate-300 hover:text-white">
                         Editar Horários
                      </button>
                   </div>
                </div>
            );
         })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Nova Unidade">
         <div className="space-y-4">
            <div>
               <label className="block text-xs text-slate-400 mb-1">Nome</label>
               <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                  value={name} onChange={e => {
                      setName(e.target.value);
                      setSlug(e.target.value.toLowerCase().replace(/\s/g, '-'));
                  }} />
            </div>
            <div>
               <label className="block text-xs text-slate-400 mb-1">Slug (URL)</label>
               <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                  value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
            <button onClick={handleCreate} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2">
                Criar Unidade
            </button>
         </div>
      </Modal>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\pages\owner\ShopsPage.tsx ---


--- INICIO DO ARQUIVO: src\react-app\pages\owner\StaffPage.tsx ---
Path: src\react-app\pages\owner\StaffPage.tsx
------------------------------
import { useEffect, useState } from "react";
import { useTenant } from "@/react-app/contexts/TenantContext";
import { getProfessionalsByShop, createProfessionalUser, removeProfessional } from "@/react-app/lib/api/staff";
import type { User } from "@/shared/types";
import Modal from "@/react-app/components/common/Modal";

export default function StaffPage() {
  const { currentShop, currentCompany } = useTenant();
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    load();
  }, [currentShop?.id]);

  async function load() {
    if (!currentShop) return;
    setLoading(true);
    const data = await getProfessionalsByShop(currentShop.id);
    setStaff(data);
    setLoading(false);
  }

  async function handleCreate() {
    if (!currentShop || !currentCompany) return;
    try {
      await createProfessionalUser({
        name, 
        email, 
        company_id: currentCompany.id, 
        shop_id: currentShop.id
      });
      setModalOpen(false);
      setName("");
      setEmail("");
      load();
    } catch (err: any) {
        // Se der erro de email duplicado, o PB retorna 400
        alert("Erro ao adicionar. Verifique se o email já existe.");
    }
  }

  async function handleRemove(id: string) {
    if (confirm("Remover acesso de profissional deste usuário?")) {
        await removeProfessional(id);
        load();
    }
  }

  if (!currentShop) return <div>Selecione uma unidade.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Profissionais</h1>
        <button onClick={() => setModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-xl">
          + Adicionar Profissional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-slate-500">Carregando...</p> : staff.map(user => (
          <div key={user.id} className="bg-slate-900 border border-white/5 p-4 rounded-xl flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover"/> : user.name?.[0]}
             </div>
             <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
             </div>
             {user.role !== 'dono' && (
                 <button onClick={() => handleRemove(user.id)} className="text-slate-600 hover:text-red-400 text-sm">
                    Remover
                 </button>
             )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Novo Profissional">
         <div className="space-y-4">
            <p className="text-xs text-slate-400 bg-slate-800 p-2 rounded">
                Uma senha provisória "Mudar@123" será criada automaticamente.
            </p>
            <div>
                <label className="block text-xs text-slate-400 mb-1">Nome Completo</label>
                <input className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                   value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label className="block text-xs text-slate-400 mb-1">E-mail de acesso</label>
                <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-white"
                   value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button onClick={handleCreate} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg mt-2">
                Cadastrar
            </button>
         </div>
      </Modal>
    </div>
  );
}
--- FIM DO ARQUIVO: src\react-app\pages\owner\StaffPage.tsx ---


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


--- INICIO DO ARQUIVO: src\react-app\pages\staff\StaffAgendaPage.tsx ---
Path: src\react-app\pages\staff\StaffAgendaPage.tsx
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

--- FIM DO ARQUIVO: src\react-app\pages\staff\StaffAgendaPage.tsx ---


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

// Certifique-se de ter renomeado o arquivo para StaffAgendaPage.tsx
import StaffAgendaPage from "../pages/staff/StaffAgendaPage";
import ClientPanelPage from "../pages/client/ClientPanelPage";
import SettingsPage from "../pages/owner/SettingsPage";
import ServicesPage from "../pages/owner/ServicesPage";
import ShopsPage from "../pages/owner/ShopsPage";
import StaffPage from "../pages/owner/StaffPage";


import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
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
        {/* --- ROTAS DO PAINEL (COM LAYOUT) --- */}
        <Route element={<AppLayout />}>
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <DashboardHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/shops"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <ShopsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/services"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <ServicesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/staff"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <StaffPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/settings"
            element={
              <ProtectedRoute allowedRoles={["dono"]}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff/agenda"
            element={
              <ProtectedRoute allowedRoles={["staff", "dono"]}>
                <StaffAgendaPage />
              </ProtectedRoute>
            }
          />

          {/* Adicione as rotas futuras aqui (services, shops, etc) */}
        </Route>
        {/* --- FIM ROTAS DO PAINEL --- */}
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

        {/* CONFIGURAÇÕES DA LOJA (Corrigido: Removida a duplicata) */}
        <Route
          path="/owner/settings"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <SettingsPage />
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
