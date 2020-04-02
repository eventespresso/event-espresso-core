import { useMemo } from 'react';
import { useRelations } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import useDatetimes from './useDatetimes';
import { Datetime } from '../../types';
import { RelatedEntitiesHook } from '../types';
import { entityListCacheIdString } from '@appServices/utilities/memo';

const useRelatedDatetimes: RelatedEntitiesHook<Datetime, 'datetimes'> = ({ entity, entityId }) => {
	const datetimes = useDatetimes();
	const { getRelations } = useRelations();
	const relatedDatetimeIds = getRelations({
		entity,
		entityId,
		relation: 'datetimes',
	});

	const cacheIds = entityListCacheIdString(datetimes);
	const relatedDatetimeIdsStr = JSON.stringify(relatedDatetimeIds);

	return useMemo(() => entitiesWithGuIdInArray(datetimes, relatedDatetimeIds), [relatedDatetimeIdsStr, cacheIds]);
};

export default useRelatedDatetimes;
