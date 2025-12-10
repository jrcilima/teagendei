# Contexto do Projeto: TeAgendei
# Versão do Documento: TeAgendei_v3.8.md
# Data: 2025-12-10 02:15:05

## 📂 Estrutura do Projeto

```text
./
    .env
    .gitignore
    package.json
    pb_schema.md
    Projeto_TeAgendei_v2.1.md
    Script_exportar_projeto.py
    TeAgendei_v3.7.md
    tsconfig.json
    tsconfig.node.json
    vite.config.ts
    src/
        vite-end.d.ts
        react-app/
            App.tsx
            main.tsx
            components/
                booking/
                common/
                layout/
            contexts/
                AuthContext.tsx
                TenantContext.tsx
            lib/
                api/
                    pocketbase.ts
                    register.ts
                utils/
            pages/
                auth/
                    LoginPage.tsx
                    RegisterPage.tsx
                booking/
                client/
                landing/
                    LandingPage.tsx
                onboarding/
                owner/
                staff/
            routes/
                AppRouter.tsx
                ProtectedRoute.tsx
        shared/
            types.ts
            utils/
```

---

## 📄 Conteúdo dos Arquivos

### 📎 `.env`
```text
// Arquivo: .env
// Tamanho: 140 bytes
##VITE_POCKETBASE_URL=http://136.248.77.97:8090
VITE_POCKETBASE_URL=http://127.0.0.1:8090
##VITE_POCKETBASE_URL=http://192.168.68.105:8090
```

---

### 📎 `.gitignore`
```text
// Arquivo: .gitignore
// Tamanho: 237 bytes
dist/
node_modules/
.wrangler/
.dev.vars
worker-configuration.d.ts
.env
.env.local
script_export_project.py
TeAgendei.md
TeAgendei_Contexto.md
TeAgendei_v1.md
Projeto_TeAgendei.md
TeAgendei_v1.*.md
Script_exportar_projeto.py
```

---

### 📎 `package.json`
```json
// Arquivo: package.json
// Tamanho: 485 bytes
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

```

---

### 📎 `pb_schema.md`
```markdown
// Arquivo: pb_schema.md
// Tamanho: 57,852 bytes
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
// ... 1110 linhas omitidas ...

```

---

### 📎 `Projeto_TeAgendei_v2.1.md`
```markdown
// Arquivo: Projeto_TeAgendei_v2.1.md
// Tamanho: 11,359 bytes
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
```

---

### 📎 `TeAgendei_v3.7.md`
```markdown
// Arquivo: TeAgendei_v3.7.md
// Tamanho: 0 bytes
// (Arquivo vazio)

```

---

### 📎 `tsconfig.json`
```json
// Arquivo: tsconfig.json
// Tamanho: 563 bytes
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

```

---

### 📎 `tsconfig.node.json`
```json
// Arquivo: tsconfig.node.json
// Tamanho: 196 bytes
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}

```

---

### 📎 `vite.config.ts`
```typescript
// Arquivo: vite.config.ts
// Tamanho: 234 bytes
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

```

---

### 📎 `src/vite-end.d.ts`
```typescript
// Arquivo: src/vite-end.d.ts
// Tamanho: 39 bytes
/// <reference types="vite/client" />

```

---

### 📎 `src/react-app/App.tsx`
```tsx
// Arquivo: src/react-app/App.tsx
// Tamanho: 460 bytes
// src/react-app/App.tsx
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </TenantProvider>
    </AuthProvider>
  );
}

```

---

### 📎 `src/react-app/main.tsx`
```tsx
// Arquivo: src/react-app/main.tsx
// Tamanho: 352 bytes
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

```

---

### 📎 `src/react-app/contexts/AuthContext.tsx`
```tsx
// Arquivo: src/react-app/contexts/AuthContext.tsx
// Tamanho: 2,136 bytes
// src/react-app/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '@/shared/types';
import {
  login as pbLogin,
  logout as pbLogout,
  getCurrentUserTyped,
  refreshAuth,
} from '@/react-app/lib/api/pocketbase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializa sessão (refresh + current user)
  useEffect(() => {
    const init = async () => {
      try {
        await refreshAuth();
        const current = await getCurrentUserTyped();
        setUser(current);
      } catch (err) {
        console.error('Erro ao inicializar auth', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void init();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await pbLogin(email, password);
      const current = await getCurrentUserTyped();
      setUser(current);
    } catch (err) {
      console.error('Erro no login', err);
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
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
};

```

---

### 📎 `src/react-app/contexts/TenantContext.tsx`
```tsx
// Arquivo: src/react-app/contexts/TenantContext.tsx
// Tamanho: 2,923 bytes
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

```

---

### 📎 `src/react-app/lib/api/pocketbase.ts`
```typescript
// Arquivo: src/react-app/lib/api/pocketbase.ts
// Tamanho: 3,456 bytes
// src/react-app/lib/api/pocketbase.ts
import PocketBase, { AuthModel } from 'pocketbase';
import { Company, Shop, User } from '@/shared/types';

const PB_URL = import.meta.env.VITE_POCKETBASE_URL as string;

if (!PB_URL) {
  console.warn('VITE_POCKETBASE_URL não definido. Configure no .env');
}

export const pb = new PocketBase(PB_URL);

// ---------------------------
// Persistência manual do auth
// ---------------------------

const AUTH_STORAGE_KEY = 'teagendei_auth_store';

function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { token: string; model: AuthModel | null };
    if (parsed?.token) {
      pb.authStore.save(parsed.token, parsed.model || null);
    }
  } catch (err) {
    console.error('Erro ao carregar auth do localStorage', err);
  }
}

function subscribeAuthStore() {
  pb.authStore.onChange((token, model) => {
    try {
      const payload = JSON.stringify({ token, model });
      localStorage.setItem(AUTH_STORAGE_KEY, payload);
    } catch (err) {
      console.error('Erro ao salvar auth no localStorage', err);
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
  const authData = await pb.collection('users').authWithPassword(email, password);
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
    await pb.collection('users').authRefresh();
  } catch (err) {
    console.warn('Falha ao fazer authRefresh, limpando sessão', err);
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
    const record = await pb.collection('users').getOne<User>(model.id, {
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
  const list = await pb.collection('companies').getFullList<Company>({
    filter: `owner_id = "${user.id}"`,
    sort: 'created',
  });

  return list;
}

export async function getShopsByCompany(companyId: string): Promise<Shop[]> {
  if (!companyId) return [];

  const list = await pb.collection('shops').getFullList<Shop>({
    filter: `company_id = "${companyId}"`,
    sort: 'name',
  });

  return list;
}

```

---

### 📎 `src/react-app/lib/api/register.ts`
```typescript
// Arquivo: src/react-app/lib/api/register.ts
// Tamanho: 3,316 bytes
// Caminho: src/react-app/lib/api/register.ts
import {pb} from "./pocketbase";
import type { Company, Shop, User } from "@/shared/types";

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

/**
 * Registra um DONO (role = 'dono')
 * Não cria empresa nem unidade aqui – isso é papel do onboarding.
 */
export async function registerOwner(data: RegisterOwnerInput): Promise<User> {
  const payload: Record<string, any> = {
    email: data.email,
    password: data.password,
    passwordConfirm: data.password,
    name: data.name,
    phone: data.phone ?? "",
    role: "dono", // compatível com seu schema (select users.role)
  };

  const record = await pb.collection("users").create(payload);
  return record as unknown as User;
}

/**
 * Registra um CLIENTE já amarrado a company_id + shop_id
 */
export async function registerClient(
  data: RegisterClientInput
): Promise<User> {
  const payload: Record<string, any> = {
    email: data.email,
    password: data.password,
    passwordConfirm: data.password,
    name: data.name,
    phone: data.phone ?? "",
    role: "cliente",
    company_id: data.companyId,
    shop_id: data.shopId,
  };

  const record = await pb.collection("users").create(payload);
  return record as unknown as User;
}

/**
 * Estrutura interna para exibir as unidades na tela de cliente
 */
export interface ShopWithCompany {
  shop: Shop;
  company: Company | null;
}

/**
 * Lista todas as SHOPS ativas e resolve a empresa de cada uma
 * via company_id
 */
export async function fetchActiveShopsWithCompany(): Promise<ShopWithCompany[]> {
  // Busca todas as unidades ativas
  const shops = await pb.collection("shops").getFullList<Shop>({
    filter: 'is_active = true',
    sort: "name",
  });

  const companyIds = Array.from(
    new Set(shops.map((s) => s.company_id).filter(Boolean))
  ) as string[];

  const companiesById = new Map<string, Company>();

  await Promise.all(
    companyIds.map(async (id) => {
      try {
        const company = await pb
          .collection("companies")
          .getOne<Company>(id);
        companiesById.set(id, company);
      } catch {
        // se der erro pra alguma company isolada, apenas ignora
      }
    })
  );

  return shops.map((shop) => ({
    shop,
    company: shop.company_id
      ? companiesById.get(shop.company_id) ?? null
      : null,
  }));
}

/**
 * Busca uma unidade específica por ID (para link /register?shopId=...)
 */
export async function getShopById(id: string): Promise<Shop | null> {
  try {
    const shop = await pb.collection("shops").getOne<Shop>(id);
    return shop;
  } catch {
    return null;
  }
}

/**
 * Busca uma unidade específica por slug (para link /register?slug=...)
 */
export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const res = await pb.collection("shops").getList<Shop>(1, 1, {
    filter: `slug = "${slug}" && is_active = true`,
  });

  if (!res.items.length) return null;
  return res.items[0];
}

```

---

### 📎 `src/react-app/pages/auth/LoginPage.tsx`
```tsx
// Arquivo: src/react-app/pages/auth/LoginPage.tsx
// Tamanho: 7,910 bytes
// src/react-app/pages/auth/LoginPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTenant } from "../../contexts/TenantContext";
import type { User } from "@/shared/types";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
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

      // Aguarda o TenantContext sincronizar
      await refreshTenant();

      // O user vem do AuthContext — NÃO do retorno do login()
      const state = location.state as { from?: string } | undefined;
      if (state?.from) {
        navigate(state.from, { replace: true });
        return;
      }

      // Agora sim, lendo o user do useAuth():
      if (!user) {
        setError("Erro inesperado ao carregar dados do usuário.");
        return;
      }

      // Regras de redirect
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
      console.error(err);
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

```

---

### 📎 `src/react-app/pages/auth/RegisterPage.tsx`
```tsx
// Arquivo: src/react-app/pages/auth/RegisterPage.tsx
// Tamanho: 16,135 bytes
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
  type ShopWithCompany,
} from "../../lib/api/register";
import type { Shop } from "@/shared/types";

type Mode = "owner" | "client";

export default function RegisterPage() {
  const [mode, setMode] = useState<Mode>("owner");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // client-specific
  const [shops, setShops] = useState<ShopWithCompany[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string>("");
  const [loadingShops, setLoadingShops] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { refreshTenant } = useTenant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pré-seleção de unidade por query (?shopId / ?slug)
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingShops(true);
      setError(null);

      try {
        const shopId = searchParams.get("shopId");
        const slug = searchParams.get("slug");

        const allShops = await fetchActiveShopsWithCompany();

        let preselected: Shop | null = null;

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
      } catch (err: any) {
        console.error(err);
        setError("Não foi possível carregar as unidades disponíveis.");
      } finally {
        if (!cancelled) {
          setLoadingShops(false);
        }
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const baseError = validateCommon();
    if (baseError) {
      setError(baseError);
      return;
    }

    if (mode === "client") {
      const extra = validateClient();
      if (extra) {
        setError(extra);
        return;
      }
    }

    setSubmitting(true);

    try {
      if (mode === "owner") {
        // 1) Cria usuário dono
        await registerOwner({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        });

        // 2) Faz login
        await login(email.trim(), password);

        // 3) Atualiza tenant (vai detectar que ainda não há company_id)
        await refreshTenant();

        // 4) Redireciona para onboarding ou dashboard do dono
        // Sugestão: sempre começar pelo onboarding
        navigate("/onboarding", { replace: true });
      } else {
        // CLIENTE
        if (!selectedShop || !selectedShop.shop.company_id) {
          throw new Error("Dados de unidade/empresa inválidos.");
        }

        const companyId = selectedShop.shop.company_id;
        const shopId = selectedShop.shop.id;

        // 1) Cria usuário cliente já amarrado
        await registerClient({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
          companyId,
          shopId,
        });

        // 2) Login
        await login(email.trim(), password);

        // 3) Não precisamos de Tenant para cliente; só levar pro fluxo de agendamento
        const slug = selectedShop.shop.slug;
        navigate(`/book/${slug}`, { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      // Mensagem amigável; se vier message do PB, usamos
      const message =
        err?.message ||
        "Não foi possível concluir o cadastro. Tente novamente em instantes.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      {/* fundo com glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 bg-emerald-500/25 blur-3xl rounded-full" />
        <div className="absolute -right-24 bottom-[-40px] w-96 h-96 bg-sky-500/25 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
        {/* Lado esquerdo: mensagem / hero */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.18em] uppercase text-emerald-300/80">
            TeaAgendei • Plataforma SaaS de agendamento
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Crie seu acesso e
            <span className="text-emerald-400"> comece a organizar</span>{" "}
            seus agendamentos hoje.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-lg">
            Donos gerenciam unidades, equipe e faturamento. Clientes agendam
            em poucos cliques na unidade preferida.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• 15 dias grátis para testar (plano trial da empresa).</li>
            <li>
              • Clientes sempre amarrados à unidade escolhida — nada de
              bagunça nos dados.
            </li>
            <li>• Agenda inteligente, antifuro e antifluxo caótico.</li>
          </ul>
        </div>

        {/* Lado direito: card do formulário */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl p-6 md:p-7 space-y-6">
          {/* header mini brand */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">
                  Cadastro de acesso
                </span>
                <span className="text-sm font-medium text-slate-50">
                  TeaAgendei
                </span>
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campos comuns */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder={
                  mode === "owner"
                    ? "Ex.: João da Barbearia Central"
                    : "Ex.: Maria Souza"
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder="voce@seuemail.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                WhatsApp (opcional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                placeholder="(00) 90000-0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Confirme a senha
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Bloco específico para CLIENTE */}
            {mode === "client" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Selecione a unidade onde você será atendido
                </label>

                {loadingShops ? (
                  <div className="text-xs text-slate-400">
                    Carregando unidades disponíveis...
                  </div>
                ) : shops.length === 0 ? (
                  <div className="text-xs text-slate-400">
                    Nenhuma unidade disponível para cadastro de cliente no
                    momento.
                  </div>
                ) : (
                  <select
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400/80 focus:border-sky-400/80"
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
                    Você ficará vinculado à unidade{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.shop.name}
                    </span>{" "}
                    da empresa{" "}
                    <span className="font-medium text-slate-200">
                      {selectedShop.company?.legal_name ?? "N/A"}
                    </span>
                    .
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || (mode === "client" && loadingShops)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 transition shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Criando seu acesso..."
                : mode === "owner"
                ? "Criar acesso de dono"
                : "Criar acesso de cliente"}
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Já tem acesso?{" "}
              <a
                href="/login"
                className="text-emerald-300 hover:text-emerald-200"
              >
                Entrar no TeaAgendei
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

```

---

### 📎 `src/react-app/pages/landing/LandingPage.tsx`
```tsx
// Arquivo: src/react-app/pages/landing/LandingPage.tsx
// Tamanho: 5,905 bytes
import React from "react";

export default function LandingPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--text)]">

      {/* HERO */}
      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "var(--gradient)" }}
      >
        <div className="max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs">
            <span className="text-[var(--primary)] text-lg">🗓</span>
            Plataforma completa para agendamentos
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Transforme a Gestão <br />
            <span className="text-[var(--primary)]">
              do seu Negócio
            </span>
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto">
            O sistema feito para Barbearias, Salões, Esmalterias e Estéticas que
            precisam crescer, organizar e fidelizar clientes com tecnologia premium.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <a
              href="/login"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-lg"
            >
              Entrar
            </a>

            <a
              href="/register"
              className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:brightness-110"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              Começar grátis 15 dias
            </a>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ferramentas poderosas ao seu alcance
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-white/10 bg-[var(--card)] space-y-2 shadow-xl shadow-black/10">
            <div className="text-3xl">📅</div>
            <h3 className="text-xl font-semibold">Agenda Inteligente</h3>
            <p className="text-slate-400 text-sm">
              Evite overbooking com cálculo automático de horários e disponibilidade.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[var(--card)] space-y-2 shadow-xl shadow-black/10">
            <div className="text-3xl">👥</div>
            <h3 className="text-xl font-semibold">Profissionais organizados</h3>
            <p className="text-slate-400 text-sm">
              Cada profissional acessa sua própria agenda e controla atendimentos.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[var(--card)] space-y-2 shadow-xl shadow-black/10">
            <div className="text-3xl">📊</div>
            <h3 className="text-xl font-semibold">Faturamento claro</h3>
            <p className="text-slate-400 text-sm">
              Veja o desempenho financeiro do seu negócio em tempo real.
            </p>
          </div>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="py-20 px-6 bg-black/20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Feito para diversos segmentos
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["💈 Barbearias", "💇 Salões", "💅 Esmalterias", "💆 Clínicas Estéticas"].map(
            (item) => (
              <div
                key={item}
                className="p-6 rounded-xl border border-white/10 bg-[var(--card)] text-center font-medium"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>

      {/* PLANO */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Planos simples e acessíveis</h2>

        <p className="text-slate-400 max-w-lg mx-auto mb-8">
          Comece com 15 dias grátis. Depois escolha o plano ideal para o seu negócio.
        </p>

        <div className="p-8 rounded-3xl border border-white/10 bg-[var(--card)] inline-block shadow-xl shadow-black/10">
          <h3 className="text-2xl font-bold">Plano Profissional</h3>
          <p className="text-5xl font-extrabold my-4">
            R$59<span className="text-xl">,90/mês</span>
          </p>
          <ul className="text-slate-400 space-y-2 text-sm mb-6">
            <li>✔ 1 unidade</li>
            <li>✔ Até 3 profissionais</li>
            <li>✔ Agendamentos ilimitados</li>
          </ul>

          <a
            href="/register"
            className="px-8 py-3 rounded-xl text-white font-semibold"
            style={{ background: "var(--primary)" }}
          >
            Começar 15 dias grátis
          </a>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-20 px-6 text-center text-white"
        style={{ background: "var(--gradient)" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronto para revolucionar seu negócio?
        </h2>

        <p className="text-white/80 mb-6">Comece agora. Leva menos de 1 minuto.</p>

        <a
          href="/register"
          className="px-10 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-xl"
        >
          Criar conta gratuitamente
        </a>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm">
        © 2025 TeAgendei — Todos os direitos reservados.
      </footer>
    </div>
  );
}

```

---

### 📎 `src/react-app/routes/AppRouter.tsx`
```tsx
// Arquivo: src/react-app/routes/AppRouter.tsx
// Tamanho: 1,949 bytes
// Caminho: src/react-app/routes/AppRouter.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BookPage from "../pages/booking/BookPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import DashboardPage from "../pages/owner/DashboardPage";
import StaffAgendaPage from "../pages/staff/StaffAgendaPage";
import ClientPanelPage from "../pages/client/ClientPanelPage";
import ProtectedRoute  from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/:slug" element={<BookPage />} />

        {/* Onboarding do dono (já autenticado, mas sem empresa) */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        {/* Painel do dono */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["dono"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Agenda do staff */}
        <Route
          path="/staff/agenda"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffAgendaPage />
            </ProtectedRoute>
          }
        />

        {/* Painel do cliente */}
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

```

---

### 📎 `src/react-app/routes/ProtectedRoute.tsx`
```tsx
// Arquivo: src/react-app/routes/ProtectedRoute.tsx
// Tamanho: 1,226 bytes
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

```

---

### 📎 `src/shared/types.ts`
```typescript
// Arquivo: src/shared/types.ts
// Tamanho: 6,535 bytes
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

  // ❌ N ÃO existe mais business_hours JSON no schema
  // business_hours?: any;

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

```

---

