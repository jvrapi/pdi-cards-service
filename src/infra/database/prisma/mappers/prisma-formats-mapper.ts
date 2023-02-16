import { Format, type FormatName } from '@application/entities/format'
import { type Prisma } from '@prisma/client'

export class PrismaFormatsMapper {
  static toDomain(formats: Prisma.JsonArray): Format[] {
    return (formats as unknown as FormatName[]).map(
      (format) => new Format(format),
    )
  }

  static toPrisma(formats: Format[]) {
    return formats
      .filter((format) => format.isLegal)
      .map((format) => format.value) as unknown as Prisma.InputJsonObject
  }
}
