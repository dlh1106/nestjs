import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ExitUserTb } from '../exit-user/entities/exit-user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserTb } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserTb)
    private readonly userRepo: Repository<UserTb>,
    @InjectRepository(ExitUserTb)
    private readonly exitUserRepo: Repository<ExitUserTb>,
  ) { }

  async create(request: CreateUserDto) {
    const { ...userData } = request;
    const user = plainToInstance(UserTb, userData);
    return await this.userRepo.save(user);
  }

  async getOneUser(login_id: string) {
    const user = await this.userRepo.findOne({
      where: { u_login_id: login_id },
    });
    if (!user) {
      throw new NotFoundException(`${login_id}에 해당하는 회원이 없습니다.`);
    }
    return user;
  }

  async delete(id: string) {
    const user = await this.userRepo.findOne({ where: { u_login_id: id } });
    this.userRepo.delete(id);
    const exit_user = new ExitUserTb();
    exit_user.user = user;
    this.exitUserRepo.save(exit_user);
    return;
  }
}
