import { Format, FormatName } from '@/application/entities/format'

export class PrismaFormatsMapper {
  static toDomain(formats: string): Format[] {
    return formats
      .split(',')
      .map(
        (format) =>
          new Format({ format: FormatName[format as keyof typeof FormatName] }),
      )
  }

  static toPrisma(formats: Format[]) {
    return formats
      .filter((format) => format.isLegal)
      .map((format) => format.value)
      .toString()
  }
}
