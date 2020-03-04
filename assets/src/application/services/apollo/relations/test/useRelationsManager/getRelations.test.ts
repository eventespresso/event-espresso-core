import { renderHook, act } from '@testing-library/react-hooks';
import { pathOr, assocPath } from 'ramda';

import { relationalData } from '../../../../../../domain/eventEditor/services/context/TestContext/data';
import useRelationsManager from '../../useRelationsManager';

describe('RelationsManager.getRelations()', () => {
	const existingRelationalEntityId = Object.keys(relationalData.datetimes)[0];

	it('returns an empty array when no data is set or passed', () => {
		const { result } = renderHook(() => useRelationsManager());

		const { current: relationsManager } = result;

		const relatedIds = relationsManager.getRelations({
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		});

		expect(relatedIds).toEqual([]);
	});

	it('returns an empty array when data is passed but the entity does not exist', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const { current: relationsManager } = result;

		const relatedIds = relationsManager.getRelations({
			entity: 'datetimes',
			entityId: 'fake-id',
			relation: 'tickets',
		});

		expect(relatedIds).toEqual([]);
	});

	it('returns an empty array when data is set using initialize but the entity does not exist', () => {
		const { result } = renderHook(() => useRelationsManager());

		act(() => {
			result.current.initialize(relationalData);
		});

		const relatedIds = result.current.getRelations({
			entity: 'datetimes',
			entityId: 'fake-id',
			relation: 'tickets',
		});

		expect(relatedIds).toEqual([]);
	});

	it('returns an empty array when data is set using initialize but the related entities do not exist', () => {
		const { result } = renderHook(() => useRelationsManager());

		const pathToRelatedEntityIds = ['datetimes', existingRelationalEntityId, 'tickets'];

		// empty related entities
		const modifiedData = assocPath(pathToRelatedEntityIds, [], relationalData);

		act(() => {
			result.current.initialize(modifiedData);
		});

		const relatedIds = result.current.getRelations({
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		});

		expect(relatedIds).toEqual([]);
	});

	it('returns an array of related entity ids when the data is passed', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const { current: relationsManager } = result;

		const relatedIds = relationsManager.getRelations({
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		});

		const pathToRelatedEntityIds = ['datetimes', existingRelationalEntityId, 'tickets'];

		const passedRelatedIds = pathOr([], pathToRelatedEntityIds, relationalData);

		expect(relatedIds).toEqual(passedRelatedIds);
	});

	it('returns an array of related entity ids when the data is set via initialize', () => {
		const { result } = renderHook(() => useRelationsManager());

		let relatedIds = result.current.getRelations({
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		});

		// before update
		expect(relatedIds).toEqual([]);

		act(() => {
			result.current.initialize(relationalData);
		});

		relatedIds = result.current.getRelations({
			entity: 'datetimes',
			entityId: existingRelationalEntityId,
			relation: 'tickets',
		});

		const pathToRelatedEntityIds = ['datetimes', existingRelationalEntityId, 'tickets'];
		const passedRelatedIds = pathOr([], pathToRelatedEntityIds, relationalData);

		// after update
		expect(relatedIds).toEqual(passedRelatedIds);
	});
});
