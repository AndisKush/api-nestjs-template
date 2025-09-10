import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  status: string;

  @Exclude()
  password: string; // mesmo se vier do banco, não será exposto

  // O construtor é importante para o plainToInstance funcionar corretamente
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
