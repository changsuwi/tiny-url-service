const base = 2 * 3 * 5 * 7 * 11;
export function idToKey(id: number) {
  const map = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const key = [];
  id = (id + 1) * base;

  while (id) {
    key.push(map[id % 62]);
    id = Math.floor(id / 62);
  }

  key.reverse();
  return key.join('');
}

export function keyToID(key: string) {
  let id = 0;

  for (let i = 0; i < key.length; i++) {
    if ('a' <= key[i] && key[i] <= 'z')
      id = id * 62 + key[i].charCodeAt(0) - 'a'.charCodeAt(0);
    if ('A' <= key[i] && key[i] <= 'Z')
      id = id * 62 + key[i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    if ('0' <= key[i] && key[i] <= '9')
      id = id * 62 + key[i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
  }

  return id / base - 1;
}
