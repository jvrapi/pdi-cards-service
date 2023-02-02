import { Set } from "@application/entities/set";

export class GraphQLSetsMapper {
  static toResponse(set: Set){
    return {
      id: set.id,
			code: set.code,
			name: set.name,
			type: set.type,
			releasedAt: set.releasedAt,
			iconUri: set.iconUri,
			isDigital: set.isDigital,
			isFoilOnly: set.isFoilOnly,
			createdAt: set.createdAt,
			updatedAt: set.updatedAt
    }
  }
}