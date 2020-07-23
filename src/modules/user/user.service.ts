import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async store(data: UserDto) {
    const { name } = data;
    const user = await this.userRepository.findOne({ name });

    if (user) {
      throw new BadRequestException('用户已经存了');
    }

    const entity = await this.userRepository.create(data);
    await this.userRepository.save(entity);
    return entity;
  }
}
