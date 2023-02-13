import { Set, SetProps } from "@application/entities/set";

type Override = Partial<SetProps>

export function makeSet(override: Override = {}){
  return new Set({
    code: 'code-example',
    isDigital: false,
    isFoilOnly: false,
    name: 'name-example',
    releasedAt: new Date().toISOString().split('T')[0],
    type: 'test',
    ...override
  })
}