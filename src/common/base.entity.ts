import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({
    format: 'uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  public createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @ApiProperty()
  @Column({ default: true })
  public isActive: boolean;
}
