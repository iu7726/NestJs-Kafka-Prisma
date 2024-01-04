import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { UserCreatedEvent } from './event/user-created.event';
import { UserGetEvent } from './event/user-get.event';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly userSvc: ClientKafka) { }

  create(createUserDto: CreateUserDto) {
    const result = this.userSvc.send(
      'user_created',
      new UserCreatedEvent(
        createUserDto.email,
        createUserDto.password,
        createUserDto.name,
      ),
    );

    return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    const result = this.userSvc.send('user_find', new UserGetEvent(id));

    return result;
  }
}
