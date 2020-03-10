import { pathOr, filter, equals } from 'ramda';

import { EntityId } from '@appServices/apollo/types';
import { TAMPossibleRelation, TAMRelationalEntity, TAMRelationalData, TAMRelationEntity } from './types';

type EntitiesToUpdate = Array<[EntityId, TAMPossibleRelation]>;

interface EntitiesForUpdateOptions<Entity extends TAMRelationEntity> {
	entity: Entity;
	existingData: TAMRelationalData;
	newData: TAMRelationalData;
	relation: Exclude<TAMRelationEntity, Entity>;
}

export const prepareEntitiesForUpdate = <Entity extends TAMRelationEntity>({
	entity,
	existingData,
	newData,
	relation,
}: EntitiesForUpdateOptions<Entity>): EntitiesToUpdate => {
	const existingEntities = pathOr<TAMRelationalEntity>({}, [entity], existingData);
	const newEntities = pathOr<TAMRelationalEntity>({}, [entity], newData);

	return filter<EntitiesToUpdate[0]>(([entityId, possibleRelation]) => {
		const newRelatedEntities = pathOr<EntityId[]>([], [relation], possibleRelation);
		const oldRelatedEntities = pathOr<EntityId[]>([], [entityId, relation], existingEntities);
		// make sure to sort them before compare
		// to make sure that they are actually different
		return !equals(newRelatedEntities.sort(), oldRelatedEntities.sort());
	}, Object.entries(newEntities));
};
