import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserResponseDto } from './dto/user-response.dto'; // <-- IMPORTADO AQUI
import { plainToInstance } from 'class-transformer';      // <-- IMPORTADO AQUI

@Controller('users')
@UseGuards(JwtAuthGuard) // Podemos aplicar o Guard no nível do controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // A rota de criação pode ser pública, então a movemos para fora do Guard global
  // ou a deixamos aqui e removemos o Guard de cima, aplicando em cada rota.
  // Por simplicidade, vamos deixar aqui e comentar o Guard de cima.
  // @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    const deletedUser = await this.usersService.remove(id);
    return plainToInstance(UserResponseDto, deletedUser, {
      excludeExtraneousValues: true,
    });
  }
}