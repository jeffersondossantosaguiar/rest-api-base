import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginPayload {
  @ApiProperty({
    description: 'email address'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user password'
  })
  @IsNotEmpty()
  password: string;
}
