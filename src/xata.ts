// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "users",
    columns: [
      { name: "email", type: "text", notNull: true, defaultValue: "empty" },
      { name: "password", type: "text", notNull: true, defaultValue: "empty" },
      { name: "fullName", type: "text", notNull: true, defaultValue: "empty" },
    ],
    revLinks: [
      { column: "user", table: "salary" },
      { column: "user", table: "budget" },
      { column: "user", table: "transactions" },
    ],
  },
  {
    name: "salary",
    columns: [
      { name: "salary", type: "float", notNull: true, defaultValue: "0" },
      { name: "payday", type: "datetime", notNull: true, defaultValue: "now" },
      { name: "user", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "budget",
    columns: [
      { name: "type", type: "text", notNull: true, defaultValue: "empty" },
      { name: "category", type: "text", notNull: true, defaultValue: "empty" },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "percentage", type: "float", notNull: true, defaultValue: "0" },
    ],
  },
  {
    name: "transactions",
    columns: [
      { name: "date", type: "datetime", notNull: true, defaultValue: "now" },
      { name: "type", type: "text", notNull: true, defaultValue: "empty" },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      { name: "amount", type: "float", notNull: true, defaultValue: "0" },
      { name: "user", type: "link", link: { table: "users" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Salary = InferredTypes["salary"];
export type SalaryRecord = Salary & XataRecord;

export type Budget = InferredTypes["budget"];
export type BudgetRecord = Budget & XataRecord;

export type Transactions = InferredTypes["transactions"];
export type TransactionsRecord = Transactions & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
  salary: SalaryRecord;
  budget: BudgetRecord;
  transactions: TransactionsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://bookworm7572-s-workspace-e0s0n4.us-east-1.xata.sh/db/expense-tracker-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
