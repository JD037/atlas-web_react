// schema/courses.js

import { schema, normalize } from 'normalizr';

const course = new schema.Entity('courses', {}, {
  processStrategy: (value, parent, key) => ({
    ...value,
    isSelected: false,
  }),
});

export const coursesNormalizer = (data) => {
  return normalize(data, [course]);
};
