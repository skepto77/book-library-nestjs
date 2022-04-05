import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDocument } from './auth.schema';
import { SignUpDto } from './dto/sing-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';

@Controller('api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() dto: SignUpDto): Promise<AuthDocument | null> {
    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.signUpUser(dto);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() { email, password }: SignInDto): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    return await this.authService.signInUser(user);
  }
}
