import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from './event/user-created.event';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async handleUserCreated(userCreatedEvent: UserCreatedEvent) {
    try {
      const user = await this.prisma.auth.create({
        data: {
          email: userCreatedEvent.email,
          password: await bcrypt.hash(userCreatedEvent.password, 10),
          profile: {
            create: {
              name: userCreatedEvent.name,
            },
          },
        },
      });

      return {
        success: true,
        user: { id: user.id, email: user.email },
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  async handleUserFind(authId: number) {
    try {
      const user = await this.prisma.auth.findMany({
        where: {
          id: authId,
        },
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              name: true,
            },
          },
        },
      });

      return user;
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }
}
