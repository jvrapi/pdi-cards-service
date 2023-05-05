import { Version, VersionName } from '@/application/entities/version'

export class PrismaVersionsMapper {
  static toDomain(versions: string | null): Version[] {
    if (versions) {
      return versions
        .split(',')
        .map(
          (version) =>
            new Version(VersionName[version as keyof typeof VersionName]),
        )
    }

    return []
  }

  static toPrisma(versions: Version[]) {
    return versions.map((version) => version.value).toString()
  }
}
