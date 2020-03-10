import { renderHook, act } from '@testing-library/react-hooks';
import { pathOr, pick } from 'ramda';

import { relationalData } from '../../../../../../domain/eventEditor/services/context/TestContext/data';
import useRelationsManager from '../../useRelationsManager';
import { RelationFunctionProps } from '../../types';

describe('RelationsManager.dropRelations()', () => {
	const existingRelationalEntityId = Object.keys(relationalData.datetimes)[0];

	it('returns an empty array for related entity ids after using dropRelations', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const options: RelationFunctionProps<'datetimes'> = {
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		};

		// before updating relations
		let relatedIds = result.current.getRelations(options);

		const pathToRelatedEntityIds = Object.values(options);
		const passedRelatedIds = pathOr([], pathToRelatedEntityIds, relationalData);

		// before update
		expect(relatedIds).toEqual(passedRelatedIds);

		act(() => {
			result.current.dropRelations(pick(['entity', 'entityId'], options));
		});

		relatedIds = result.current.getRelations(options);

		// after update
		expect(relatedIds).toEqual([]);
	});
});
