import { Color, ColorName } from '@/application/entities/color'

export class PrismaColorsMapper {
  static toDomain(color: string | null): Color[] {
    if (color) {
      return color
        .split(',')
        .map((name) => new Color(ColorName[name as keyof typeof ColorName]))
    }

    return []
  }

  static toPrisma(colors: Color[]) {
    return colors.map((color) => color.value).toString()
  }
}
