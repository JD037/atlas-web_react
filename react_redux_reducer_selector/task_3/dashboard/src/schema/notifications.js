import { normalize, schema } from 'normalizr';
import * as notifications from '../../notifications.json';

// Define a user entity
const user = new schema.Entity('users');

// Define a message entity
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });

// Define a notification entity
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

// Normalize the data
export const normalizedData = normalize(notifications.default, [notification]);

export function getAllNotificationsByUser(userId) {
  const { notifications, messages } = normalizedData.entities;
  return Object.values(notifications).reduce((acc, notification) => {
    if (notification.author === userId) {
      acc.push(messages[notification.context]);
    }
    return acc;
  }, []);
}
