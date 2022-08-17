import { ConfigModule } from '@nestjs/config';
import * as envalid from 'envalid';
import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { createUsers1658835996528 } from './migrations/1658835996528-create-users';
import { seedAdminUser1658873681448 } from './migrations/1658873681448-seed_admin_user';

ConfigModule.forRoot();

const env = envalid.cleanEnv(process.env, {
  DB_PORT: envalid.port({ default: 5432 }),
  DB_HOST: envalid.str({ default: 'localhost' }),
  DB_DATABASE: envalid.str({ default: '' }),
  DB_USERNAME: envalid.str({ default: '' }),
  DB_PASSWORD: envalid.str({ default: '' }),
  DB_LOGGING: envalid.bool({ default: true })
});

function sslOptions() {
  if (env.DB_HOST === 'localhost') return false;
  else
    return {
      rejectUnauthorized: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      ssl: {
        rejectUnauthorized: false
      }
    };
}

export default new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: false,
  logging: env.DB_LOGGING,
  logger: 'file',
  //entities: ['dist/**/*.entity.js'],
  //migrations: ['dist/**/migrations/*.js'],
  entities: [User],
  migrations: [createUsers1658835996528, seedAdminUser1658873681448],
  ssl: sslOptions(),
  useUTC: true
});
