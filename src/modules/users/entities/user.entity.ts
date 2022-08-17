import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { RolesEnum } from '../../../common/roles.enum';

@Entity()
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    format: 'email'
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    enum: RolesEnum
  })
  @Column({
    nullable: false,
    enum: RolesEnum,
    default: RolesEnum.USER
  })
  role: RolesEnum;
}
