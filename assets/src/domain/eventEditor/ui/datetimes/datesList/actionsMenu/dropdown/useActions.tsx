import React, { useCallback } from 'react';
import { pick } from 'ramda';
import { __ } from '@wordpress/i18n';

import { isTrashed } from '@sharedServices/predicates';
import { useDatetimeItem } from '@edtrServices/apollo';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useEventId } from '@edtrServices/apollo/queries/events';
import { useFormModal } from '@appLayout/formModal';
import { useRelations } from '@appServices/apollo/relations';

const useActions = ({ datetimeId }) => {
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const datetime = useDatetimeItem({ id: datetimeId });

	if (!datetime) return {};

	const eventId = useEventId();
	const { openEditor } = useFormModal();

	const { id, cacheId } = datetime;
	const trashed = isTrashed(datetime);

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
	const editDate = useCallback(
		() =>
			openEditor({
				editorId: 'editDatetime',
				entityId: datetime.id,
				entityDbId: datetime.dbId,
			}),
		[datetime.id]
	);
	const trashDate = useCallback(() => deleteEntity({ id, deletePermanently: trashed }), [cacheId, trashed]);

	return {
		copyDate,
		editDate,
		trashDate,
		trashed,
	};
};

export default useActions;
