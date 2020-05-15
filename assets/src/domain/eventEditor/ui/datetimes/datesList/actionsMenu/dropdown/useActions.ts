import { useCallback } from 'react';
import { pick } from 'ramda';
import { __ } from '@wordpress/i18n';

import { isTrashed } from '@sharedServices/predicates';
import { useDatetimeItem } from '@edtrServices/apollo';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useEventId } from '@edtrServices/apollo/queries/events';
import { useRelations } from '@appServices/apollo/relations';

const useActions = ({ datetimeId }) => {
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const datetime = useDatetimeItem({ id: datetimeId });

	if (!datetime) return {};

	const eventId = useEventId();

	const { id, cacheId } = datetime;

	const { createEntity } = useDatetimeMutator();
	const { deleteEntity } = useDatetimeMutator(id);
	const { getRelations } = useRelations();

	const tickets = getRelations({
		entity: 'datetimes',
		entityId: datetime.id,
		relation: 'tickets',
	});

	const copyDate = useCallback(() => {
		const newDatetime = pick(
			['capacity', 'description', 'endDate', 'isPrimary', 'name', 'order', 'reserved', 'sold', 'startDate'],
			datetime
		);

		return createEntity({ ...newDatetime, eventId, tickets });
	}, [datetime, tickets]);

	const trashed = isTrashed(datetime);

	const trashDate = useCallback(() => deleteEntity({ id, deletePermanently: trashed }), [cacheId, trashed]);

	return {
		copyDate,
		trashDate,
		trashed,
	};
};

export default useActions;
