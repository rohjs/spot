export function getStringQuery(query?: string | string[]) {
  if (typeof query === 'string') return query
  if (query instanceof Array && query[0]) return query[0]
  return ''
}
