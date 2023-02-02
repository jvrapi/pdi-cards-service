import { Version, VersionName } from '@application/entities/version';
import { Prisma } from '@prisma/client';

export class PrismaVersionsMapper {
  static toDomain(raw: Prisma.JsonArray): Version[] {
    return (raw as unknown as Array<VersionName>).map(
      (version) => new Version(version)
    );
  }

  static toPrisma(versions: Version[]) {
    return versions.map(
      (version) => version.value
    ) as unknown as Prisma.InputJsonObject;
  }
}
