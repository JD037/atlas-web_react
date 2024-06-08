// schema/notifications.js

import { normalize, schema } from 'normalizr';
import notifications from '../../notifications.json';

// Define a user entity
const user = new schema.Entity('users');

// Define a message entity
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });

// Define a notification entity
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
}, {
  processStrategy: (value, parent, key) => ({
    ...value,
    isRead: value.context.isRead || false,
  }),
});

// Normalize the data
export const normalizedData = normalize(notifications, [notification]);

// Add a function to normalize notifications data
export const notificationsNormalizer = (data) => {
  return normalize(data, [notification]);
};

export function getAllNotificationsByUser(userId) {
  const { notifications, messages } = normalizedData.entities;
  return Object.values(notifications).reduce((acc, notification) => {
    if (notification.author === userId) {
      acc.push(messages[notification.context]);
    }
    return acc;
  }, []);
}
