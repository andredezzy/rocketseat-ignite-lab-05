import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';

type Override = Partial<Notification>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'any_recipient_id',
    content: new Content('any_content'),
    category: 'any_category',
    ...override,
  });
}
