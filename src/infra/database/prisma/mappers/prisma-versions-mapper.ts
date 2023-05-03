import { Version, VersionName } from '@/application/entities/version'

export class PrismaVersionsMapper {
  static toDomain(raw: string): Version[] {
    return raw
      .split(',')
      .map(
        (version) =>
          new Version(VersionName[version as keyof typeof VersionName]),
      )
  }

  static toPrisma(versions: Version[]) {
    return versions.map((version) => version.value).toString()
  }
}
