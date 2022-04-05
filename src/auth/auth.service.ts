import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/sing-up.dto';
import { Auth, AuthDocument } from './auth.schema';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';

import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signUpUser(dto: SignUpDto): Promise<AuthDocument | null> {
    const salt = await genSalt(10);
    const newUser = new this.authModel({
      ...dto,
      password: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string): Promise<AuthDocument | null> {
    return this.authModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthDocument | null> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return user;
  }

  async signInUser(user: SignInDto): Promise<any> {
    const { _id: id, email, lastName } = user;
    return {
      token: await this.jwtService.signAsync({ id, email, lastName }),
    };
  }
}
