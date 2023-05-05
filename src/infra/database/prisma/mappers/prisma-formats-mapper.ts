import { Format, FormatName } from '@/application/entities/format'

export class PrismaFormatsMapper {
  static toDomain(formats: string | null): Format[] {
    if (formats) {
      return formats.split(',').map(
        (format) =>
          new Format({
            format: FormatName[format as keyof typeof FormatName],
          }),
      )
    }

    return []
  }

  static toPrisma(formats: Format[]) {
    return formats
      .filter((format) => format.isLegal)
      .map((format) => format.value)
      .toString()
  }
}
