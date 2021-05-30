export function strToMilis(str: string): number {
  const t: number = Number.parseInt(str.slice(0, str.length - 1));
  switch (str.slice(str.length - 1, str.length)) {
    case 's':
      return t * 1000;
    case 'm':
      return t * 60 * 1000;
    case 'h':
      return t * 60 * 60 * 1000;
    case 'd':
      return t * 24 * 60 * 60 * 1000;
    case 'w':
      return t * 7 * 24 * 60 * 60 * 1000;
    case 'M':
      return t * 30 * 24 * 60 * 60 * 1000;
    case 'y':
      return t * 365 * 24 * 60 * 60 * 1000;
    default:
      throw new Error('wrong string format');
  }
}
