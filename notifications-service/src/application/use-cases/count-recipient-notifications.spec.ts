import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();

  it('should be able to count recipient notifications', async () => {
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        content: new Content('This is a notification'),
        category: 'social',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        content: new Content('This is a notification'),
        category: 'social',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-2',
        content: new Content('This is a notification'),
        category: 'social',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
