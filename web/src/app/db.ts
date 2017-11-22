import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
  version: 1,
  name: 'employees_app',
  stores: {
    employees: {
      autoIncrement: true,
      primaryKey: 'ID'
    }
  }
};