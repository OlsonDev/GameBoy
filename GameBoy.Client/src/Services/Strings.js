import { size } from 'lodash'

export function pluralize(countable, noun) {
  const n = size(countable);
  return n === 1 ? `1 ${noun}` : `${n} ${noun}s`;
}
