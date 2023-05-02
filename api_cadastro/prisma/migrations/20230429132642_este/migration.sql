/*
  Warnings:

  - You are about to alter the column `msrepl_synctran_ts` on the `Profissao` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Unsupported("timestamp")`.
  - You are about to alter the column `msrepl_synctran_ts` on the `Tipo_Logradouro` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Unsupported("timestamp")`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profissao" (
    "cd_profissao" DECIMAL NOT NULL PRIMARY KEY,
    "ds_profissao" TEXT,
    "msrepl_synctran_ts" timestamp NOT NULL
);
INSERT INTO "new_Profissao" ("cd_profissao", "ds_profissao", "msrepl_synctran_ts") SELECT "cd_profissao", "ds_profissao", "msrepl_synctran_ts" FROM "Profissao";
DROP TABLE "Profissao";
ALTER TABLE "new_Profissao" RENAME TO "Profissao";
CREATE TABLE "new_Tipo_Logradouro" (
    "cd_tipo_logradouro" TEXT NOT NULL PRIMARY KEY,
    "ds_tipo_logradouro" TEXT NOT NULL,
    "msrepl_synctran_ts" timestamp NOT NULL
);
INSERT INTO "new_Tipo_Logradouro" ("cd_tipo_logradouro", "ds_tipo_logradouro", "msrepl_synctran_ts") SELECT "cd_tipo_logradouro", "ds_tipo_logradouro", "msrepl_synctran_ts" FROM "Tipo_Logradouro";
DROP TABLE "Tipo_Logradouro";
ALTER TABLE "new_Tipo_Logradouro" RENAME TO "Tipo_Logradouro";
CREATE TABLE "new_Bairro" (
    "cd_bairro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ds_bairro" TEXT,
    "cd_cidade" TEXT,
    "cd_setor" TEXT,
    "ds_bairro_tribuna" TEXT,
    CONSTRAINT "Bairro_cd_cidade_fkey" FOREIGN KEY ("cd_cidade") REFERENCES "Cidade" ("cd_cidade") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Bairro" ("cd_bairro", "cd_cidade", "cd_setor", "ds_bairro", "ds_bairro_tribuna") SELECT "cd_bairro", "cd_cidade", "cd_setor", "ds_bairro", "ds_bairro_tribuna" FROM "Bairro";
DROP TABLE "Bairro";
ALTER TABLE "new_Bairro" RENAME TO "Bairro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
