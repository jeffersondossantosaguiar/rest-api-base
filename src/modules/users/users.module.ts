import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
