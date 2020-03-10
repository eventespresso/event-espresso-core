import { useMemo } from 'react';
import { useRelations, RelationEntity } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import useDatetimes from './useDatetimes';
import { Datetime } from '../../types';
import { EntityId } from '@appServices/apollo/types';

interface RelatedDatetimesProps {
	entity: Exclude<RelationEntity, 'datetimes'>;
	entityId: EntityId;
}

const useRelatedDatetimes = ({ entity, entityId }: RelatedDatetimesProps): Array<Datetime> => {
	const datetimes = useDatetimes();
	const { getRelations } = useRelations();
	const relatedDatetimeIds = getRelations({
		entity,
		entityId,
		relation: 'datetimes',
	});

	return useMemo(() => {
		return relatedDatetimeIds.length ? entitiesWithGuIdInArray(datetimes, relatedDatetimeIds) : [];
	}, [relatedDatetimeIds.length, datetimes]);
};

export default useRelatedDatetimes;
