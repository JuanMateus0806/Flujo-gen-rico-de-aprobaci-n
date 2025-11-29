import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  role: string;
}
