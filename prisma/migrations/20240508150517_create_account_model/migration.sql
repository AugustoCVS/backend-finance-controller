-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CORRENTE', 'POUPANCA', 'SALARIO', 'PAGAMENTOS', 'OUTRAS');

-- CreateEnum
CREATE TYPE "Bank" AS ENUM ('ITAU_UNIBANCO', 'BRADESCO', 'SANTANDER', 'BTG_PACTUAL', 'NUBANK', 'C6', 'INTER', 'CAIXA', 'OUTROS');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "bank" "Bank" NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
