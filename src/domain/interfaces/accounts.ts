import { AccountType, Bank } from "@prisma/client";

export interface IAccount {
  id: string;
  name: string;
  balance: number;
  bank: Bank;
  accountType: AccountType;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAccountDTO {
  bank: Bank;
  accountType: AccountType;
  description: string;
  userId: string;
}

export interface IUpdateAccountDTO {
  bank?: Bank;
  accountType?: AccountType;
  description?: string;
}

