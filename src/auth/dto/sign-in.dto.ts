import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
