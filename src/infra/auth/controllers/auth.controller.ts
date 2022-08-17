import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginPayload } from '../models/login.payload';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'API authentication' })
  @ApiBody({
    type: LoginPayload
  })
  @ApiSecurity('API-KEY')
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
