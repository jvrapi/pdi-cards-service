import { Color, ColorName } from '@/application/entities/color'

export class PrismaColorsMapper {
  static toDomain(raw: string): Color[] {
    return raw
      .split(',')
      .map((name) => new Color(ColorName[name as keyof typeof ColorName]))
  }

  static toPrisma(colors: Color[]) {
    return colors.map((color) => color.value).toString()
  }
}
