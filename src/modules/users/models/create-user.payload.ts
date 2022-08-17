import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import { BaseCreatePayload } from '../../../common/base-create.payload';

export class CreateUserPayload extends BaseCreatePayload {
  @ApiProperty({
    description: 'User email address',
    format: 'email'
  })
  @IsDefined({ message: 'User email is required' })
  @IsEmail()
  @Transform((value) => {
    return value.value.trim().toLowerCase();
  })
  email: string;

  @ApiProperty({
    description: 'User name'
  })
  @IsDefined({ message: 'User name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User password'
  })
  @IsDefined({ message: 'User password is required' })
  @IsString()
  password: string;
}
