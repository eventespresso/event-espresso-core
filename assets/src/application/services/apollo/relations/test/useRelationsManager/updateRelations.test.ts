import { renderHook, act } from '@testing-library/react-hooks';
import { pathOr } from 'ramda';

import { relationalData } from '../../../../../../domain/eventEditor/services/context/TestContext/data';
import useRelationsManager from '../../useRelationsManager';
import { RelationFunctionProps } from '../../types';

describe('RelationsManager.updateRelations()', () => {
	const existingRelationalEntityId = Object.keys(relationalData.datetimes)[0];

	it('returns an updated array of related entity ids after using updateRelations', () => {
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
		const newRelatedEntities = ['alpha', 'beta', 'gamma'];
		const updatedRelatedEntities = [...passedRelatedIds, ...newRelatedEntities];

		// before update
		expect(relatedIds).toEqual(passedRelatedIds);

		act(() => {
			result.current.updateRelations({
				...options,
				relationIds: updatedRelatedEntities,
			});
		});

		relatedIds = result.current.getRelations(options);

		// after update
		expect(relatedIds).toEqual(updatedRelatedEntities);
	});
});
