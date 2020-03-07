import { createHash } from 'crypto';

export default (url) => {
  const hash = createHash('md5');
  hash.update(url);
  return hash.digest('hex').slice(0, 8);
};
