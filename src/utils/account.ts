import { AccountType, Bank } from "@prisma/client";

export const accountBankName: Record<Bank, string> = {
  [Bank.BRADESCO]: "Bradesco",
  [Bank.BTG_PACTUAL]: "BTG Pactual",
  [Bank.C6]: "C6 Bank",
  [Bank.CAIXA]: "Caixa",
  [Bank.INTER]: "Inter",
  [Bank.ITAU_UNIBANCO]: "Itaú",
  [Bank.NUBANK]: "Nubank",
  [Bank.SANTANDER]: "Santander",
  [Bank.OUTROS]: "Outros",
};

export const accountTypeName: Record<AccountType, string> = {
  [AccountType.CORRENTE]: "Corrente",
  [AccountType.POUPANCA]: "Poupança",
  [AccountType.PAGAMENTOS]: "Pagamento",
  [AccountType.SALARIO]: "Salário",
  [AccountType.OUTRAS]: "Outros",
};
