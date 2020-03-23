import { useMemo } from 'react';
import { useRelations } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import useDatetimes from './useDatetimes';
import { Datetime } from '../../types';
import { RelatedEntitiesHook } from '../types';

const useRelatedDatetimes: RelatedEntitiesHook<Datetime, 'datetimes'> = ({ entity, entityId }) => {
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
