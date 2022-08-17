import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: false,
        logging: configService.get('DB_LOGGING'),
        ssl:
          configService.get('DB_HOST') === 'localhost'
            ? false
            : {
              rejectUnauthorized: true,
              extra: {
                ssl: {
                  rejectUnauthorized: false
                }
              },
              ssl: {
                rejectUnauthorized: false
              }
            },
        useUTC: true,
        entities: [],
        autoLoadEntities: true
      })
    })
  ]
})
export class DbModule {}
