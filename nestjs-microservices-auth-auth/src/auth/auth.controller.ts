import { Controller, Post, UseGuards, Request, Logger, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: any) {
    return this.authService.login(user);
  }

  @MessagePattern({ role: 'auth', cmd: 'check'})
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch(e) {
      Logger.log(e);
      return false;
    }
  }
}
