import { renderHook, act } from '@testing-library/react-hooks';
import { pathOr, path } from 'ramda';

import { relationalData } from '../../../../../../domain/eventEditor/services/context/TestContext/data';
import useRelationsManager from '../../useRelationsManager';
import { RelationFunctionProps } from '../../types';

describe('RelationsManager.addRelation()', () => {
	const existingRelationalEntityId = Object.keys(relationalData.datetimes)[0];
	const pathToRelatedEntityIds = ['datetimes', existingRelationalEntityId, 'tickets'];
	const existingRelatedEntityId = path(pathToRelatedEntityIds, relationalData)[0];

	it('makes no difference when trying to add an already existing relation', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const options: RelationFunctionProps<'datetimes'> = {
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		};

		// before updating relations
		const relatedIdsBeforeAdd = result.current.getRelations(options);

		const passedRelatedIds = pathOr([], pathToRelatedEntityIds, relationalData);

		// before update
		expect(relatedIdsBeforeAdd).toEqual(passedRelatedIds);

		act(() => {
			result.current.addRelation({
				...options,
				relationId: existingRelatedEntityId,
			});
		});

		const relatedIdsAfterAdd = result.current.getRelations(options);

		// after update
		expect(relatedIdsBeforeAdd).toEqual(relatedIdsAfterAdd);
	});

	it('returns an updated array of related entity ids after using addRelation', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const options: RelationFunctionProps<'datetimes'> = {
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		};

		// before updating relations
		let relatedIds = result.current.getRelations(options);

		const passedRelatedIds = pathOr([], pathToRelatedEntityIds, relationalData);
		const newRelatedEntity = existingRelatedEntityId + 'alpha'; // make sure it's different
		const updatedRelatedEntities = [...passedRelatedIds, newRelatedEntity];

		// before update
		expect(relatedIds).toEqual(passedRelatedIds);

		act(() => {
			result.current.addRelation({
				...options,
				relationId: newRelatedEntity,
			});
		});

		relatedIds = result.current.getRelations(options);

		// after update
		expect(relatedIds).not.toBe(passedRelatedIds);
		expect(relatedIds).toEqual(updatedRelatedEntities);
	});
});
