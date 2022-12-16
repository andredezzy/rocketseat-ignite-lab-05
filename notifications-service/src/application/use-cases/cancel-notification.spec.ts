import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();

  it('should be able to cancel a notification', async () => {
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('This is a notification'),
      category: 'social',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const cancelNotification = new CancelNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({
        notificationId: 'non-existing-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
