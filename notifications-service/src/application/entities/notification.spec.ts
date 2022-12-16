import { Notification } from './notification';
import { Content } from './content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('New friend request'),
      category: 'social',
      createdAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
