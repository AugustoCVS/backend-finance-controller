import { TransactionType, TransactionCategory } from '@prisma/client';

export interface ITransaction {
  id: string;
  description: string;
  value: number;
  date: Date;
  type: TransactionType;
  category: TransactionCategory;
  accountId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTransactionDTO {
  description: string;
  value: number;
  date: Date;
  category: TransactionCategory;
  type: TransactionType;
  accountId: string;
  userId: string;
}

export interface IUpdateTransactionDTO {
  description?: string;
  value?: number;
  date?: Date;
  category?: TransactionCategory;
  type?: TransactionType;
}

export interface IGetTransactionsInput {
  userId: string;
  category?: TransactionCategory;
  accountId?: string;
  page?: number;
  limit?: number;
}

export interface ISearchTransactionParams {
  userId?: string;
  accountId?: string;
  category?: TransactionCategory;
};