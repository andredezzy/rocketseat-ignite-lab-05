import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper';
import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export default class PrismaNotificationsRepository
  implements NotificationsRepository
{
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(raw);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const raw = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return raw.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: raw,
    });
  }
}
