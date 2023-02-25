import { Set, type SetProps } from '@/application/entities/set'

export type Override = Partial<SetProps>

export function makeSet(override: Override = {}) {
  return new Set({
    code: 'code-example',
    isDigital: false,
    isFoilOnly: false,
    name: 'name-example',
    releasedAt: new Date().toISOString().split('T')[0],
    type: 'test',
    ...override,
  })
}
