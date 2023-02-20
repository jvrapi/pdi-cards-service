import { type Prisma } from '@prisma/client'

import { Version, type VersionName } from '@/application/entities/version'

export class PrismaVersionsMapper {
  static toDomain(raw: Prisma.JsonArray): Version[] {
    return (raw as unknown as VersionName[]).map(
      (version) => new Version(version),
    )
  }

  static toPrisma(versions: Version[]) {
    return versions.map(
      (version) => version.value,
    ) as unknown as Prisma.InputJsonObject
  }
}
