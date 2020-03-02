import { pathOr, filter, equals } from 'ramda';

import { EntityId } from '@appServices/apollo/types';
import { RelationalEntity, PossibleRelation, RelationalData } from '@appServices/apollo/relations';

type EntitiesToUpdate = Array<[EntityId, PossibleRelation]>;

interface EntitiesForUpdateOptions {
	entity: 'datetimes' | 'tickets';
	existingData: RelationalData;
	newData: RelationalData;
	relation: 'datetimes' | 'tickets';
}

export const prepareEntitiesForUpdate = ({
	entity,
	existingData,
	newData,
	relation,
}: EntitiesForUpdateOptions): EntitiesToUpdate => {
	const existingEntities = pathOr<RelationalEntity>({}, [entity], existingData);
	const newEntities = pathOr<RelationalEntity>({}, [entity], newData);

	return filter<EntitiesToUpdate[0]>(([entityId, possibleRelation]) => {
		const newRelatedEntities = pathOr<EntityId[]>([], [relation], possibleRelation);
		const oldRelatedEntities = pathOr<EntityId[]>([], [entityId, relation], existingEntities);
		// make sure to sort them before compare
		// to make sure that they are actually different
		return !equals(newRelatedEntities.sort(), oldRelatedEntities.sort());
	}, Object.entries(newEntities));
};
