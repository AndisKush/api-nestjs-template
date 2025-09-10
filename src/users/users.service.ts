import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('As senhas não conferem.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<User[]> {
    // Simplificado: Apenas retorna os dados. O interceptor fará a transformação.
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    // Simplificado: Apenas retorna o usuário. O interceptor remove a senha.
    return user;
  }

  findByEmail(email: string) {
    // Usado para autenticação, retorna o objeto completo (inclui password)
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });
    if (!userToUpdate) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    if (updateUserDto.email) {
      const existingUserWithEmail = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });
      if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        throw new ConflictException('O e-mail já está em uso por outro usuário.');
      }
    }
    
    // Cria uma cópia limpa dos dados para evitar mutação do DTO original
    const dataToUpdate = { ...updateUserDto };

    // Lógica para tratar a alteração de senha
    if (dataToUpdate.password) {
      if (dataToUpdate.password !== dataToUpdate.confirmPassword) {
        throw new BadRequestException('As senhas para alteração não conferem.');
      }
      // Criptografa a nova senha
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }
    
    // Remove o campo confirmPassword do objeto que será enviado ao Prisma
    delete dataToUpdate.confirmPassword;
    
    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: number): Promise<User> {
    // Simplificado: Apenas deleta e retorna o usuário deletado.
    return this.prisma.user.delete({ where: { id } });
  }
}