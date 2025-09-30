import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A confirmação de senha deve ter no mínimo 6 caracteres' })
  confirmPassword: string;

  @IsOptional()
  @IsIn(['ativo', 'inativo'], { message: 'O status deve ser ativo ou inativo' })
  status?: string;
}