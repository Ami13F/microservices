import { Controller, UseGuards, Get, Post, Body, Head, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import { AuthGuard } from '../guards/AuthGuard';

@Controller("/auth")
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ email: data.email });
  }

  @Post("/signup")
  async createAccount(@Body() user: User ){
    console.log("server user:", user)
    return this.userService.createUser(user)
  }

  // @UseGuards(AuthGuard)
  @Get('/greet')  
  async greet(): Promise<string> {
    return 'All good! Keep working :)'; 
  }
} 