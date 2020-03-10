import { renderHook, act } from '@testing-library/react-hooks';
import { pathOr, path } from 'ramda';

import { relationalData } from '../../../../../../domain/eventEditor/services/context/TestContext/data';
import useRelationsManager from '../../useRelationsManager';
import { RelationFunctionProps } from '../../types';

describe('RelationsManager.removeRelation()', () => {
	const existingRelationalEntityId = Object.keys(relationalData.datetimes)[0];
	const pathToRelatedEntityIds = ['datetimes', existingRelationalEntityId, 'tickets'];
	const existingRelatedEntityId = path(pathToRelatedEntityIds, relationalData)[0];

	it('makes no difference when trying to remove a non-existant relation', () => {
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
			result.current.removeRelation({
				...options,
				relationId: 'fake-id',
			});
		});

		const relatedIdsAfterAdd = result.current.getRelations(options);

		// after update
		expect(relatedIdsBeforeAdd).toEqual(relatedIdsAfterAdd);
	});

	it('returns an updated array of related entity ids after using removeRelation WITH `relationId`', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const options: RelationFunctionProps<'datetimes'> = {
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		};

		// before updating relations
		let relatedIds = result.current.getRelations(options);

		const passedRelatedIds = path<string[]>(pathToRelatedEntityIds, relationalData);
		const updatedRelatedEntities = passedRelatedIds.filter((id) => id !== existingRelatedEntityId);

		// before update
		expect(relatedIds).toEqual(passedRelatedIds);

		act(() => {
			result.current.removeRelation({
				...options,
				relationId: existingRelatedEntityId,
			});
		});

		relatedIds = result.current.getRelations(options);

		// after update
		expect(relatedIds).not.toBe(passedRelatedIds);
		expect(relatedIds).toEqual(updatedRelatedEntities);
	});

	it('removes entityId from all `relation` lists after using removeRelation WITHOUT `relationId`', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const options: RelationFunctionProps<'datetimes'> = {
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		};

		// before updating relations
		const relatedIds = result.current.getRelations(options);

		const passedRelatedIds = path<string[]>(pathToRelatedEntityIds, relationalData);

		// before update
		expect(relatedIds).toEqual(passedRelatedIds);

		act(() => {
			result.current.removeRelation(options);
		});

		relatedIds.forEach((entityId) => {
			const updatedRelations = result.current.getRelations({
				entity: 'tickets',
				entityId,
				relation: 'datetimes',
			});
			expect(updatedRelations).not.toContain(existingRelationalEntityId);
		});
	});
});
