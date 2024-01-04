import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserCreatedEvent } from './event/user-created.event';
import { GetUserRequest } from './dto/get-user-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('user_created')
  async messageHandleUserCreated(data: UserCreatedEvent) {
    const result = await this.appService.handleUserCreated(data);
    return result;
  }

  @MessagePattern('user_find')
  async messageHandleUserFind(data: GetUserRequest) {
    const result = await this.appService.handleUserFind(data.id);
    return result;
  }
}
