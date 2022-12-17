import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/messaging/kafka/controllers/notifications.controller';
import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
