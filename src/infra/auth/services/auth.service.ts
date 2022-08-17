import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../../../modules/users/entities/user.entity';
import { UsersService } from '../../../modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const passwordMatch = await compare(pass, user.password);

    if (!passwordMatch) return null;

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      id: user.id,
      accessToken: `Bearer ${this.jwtService.sign(payload)}`,
      role: user.role
    };
  }
}
