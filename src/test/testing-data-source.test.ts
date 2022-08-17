import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';

export const TestingDataSource = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  dropSchema: true,
  entities: [User],
  synchronize: true
});
