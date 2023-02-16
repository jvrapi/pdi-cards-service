import { Color, type ColorName } from '@application/entities/color'
import { type Prisma } from '@prisma/client'

export class PrismaColorsMapper {
  static toDomain(raw: Prisma.JsonArray): Color[] {
    return (raw as unknown as ColorName[]).map((name) => new Color(name))
  }

  static toPrisma(colors: Color[]) {
    return colors.map(
      (color) => color.value,
    ) as unknown as Prisma.InputJsonObject
  }
}
