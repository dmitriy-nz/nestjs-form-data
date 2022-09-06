export function toArray<T>(items: T | T[]): T[] {
  return (Array.isArray(items))
    ? items
    : [items];
}
