export { cn } from 'cn'

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
