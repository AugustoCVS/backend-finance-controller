/*
  Warnings:

  - Added the required column `category` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('SALARIO', 'ALIMENTACAO', 'TRANSPORTE', 'LAZER', 'EDUCACAO', 'VIAGENS', 'SAUDE', 'OUTROS');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "category" "TransactionCategory" NOT NULL;
