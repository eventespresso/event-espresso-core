/**
 * External dependencies
 */
import { omit } from 'ramda';

/**
 * Internal dependencies
 */
import {
	entityDbId,
	entityGuId,
	entityHasDbId,
	entityHasGuid,
	findEntityByDbId,
	findEntityByGuid,
	entitiesWithDbIdInArray,
	entitiesWithGuIdInArray,
} from './index';
import { nodes as datetimes } from '../../../../eventEditor/services/apollo/queries/datetimes/test/data';
import { nodes as tickets } from '../../../../eventEditor/services/apollo/queries/tickets/test/data';
import { getGuids } from '@appServices/predicates';

describe('entityDbId', () => {
	it('should return dbId for each entity', () => {
		datetimes.forEach((entity) => {
			expect(entityDbId(entity)).toBe(entity.dbId);
		});
	});
});

describe('entityGuId', () => {
	it('should return id for each entity', () => {
		datetimes.forEach((entity) => {
			expect(entityGuId(entity)).toBe(entity.id);
		});
	});
});

describe('entityHasDbId', () => {
	it('should return true if entity has dbId', () => {
		datetimes.forEach((entity) => {
			expect(entityHasDbId(entity.dbId)(entity)).toBe(true);
		});
	});

	it('should return false if entity does NOT have dbId', () => {
		datetimes.forEach((entity) => {
			const newEntity: any = omit(['dbId'], entity);
			expect(entityHasDbId(newEntity.dbId)(entity)).toBe(false);
		});
	});
});

describe('entityHasGuid', () => {
	it('should return true if entity has dbId', () => {
		datetimes.forEach((entity) => {
			expect(entityHasGuid(entity.id)(entity)).toBe(true);
		});
	});
});

describe('findEntityByDbId', () => {
	it('should return the entity with corresponding dbId', () => {
		const dbIds = datetimes.map(({ dbId }) => dbId);

		dbIds.forEach((dbId) => {
			const entity = findEntityByDbId(datetimes)(dbId);
			expect(entity.dbId).toBe(dbId);
		});
	});

	it('should return undefined if there is no corresponding entity to the specified dbId', () => {
		const dbId = 101001110011110001110011;
		const entity = findEntityByDbId(datetimes)(dbId);

		expect(entity).toBeUndefined();
	});
});

describe('findEntityByGuid', () => {
	it('should return the entity with corresponding id', () => {
		const ids = getGuids(datetimes);

		ids.forEach((id) => {
			const entity = findEntityByGuid(datetimes)(id);
			expect(entity.id).toBe(id);
		});
	});

	it('should return undefined if there is no corresponding entity to the specified dbId', () => {
		const id = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
		const entity = findEntityByGuid(datetimes)(id);

		expect(entity).toBeUndefined();
	});
});

describe('entitiesWithDbIdInArray', () => {
	it('should return an array of entities corresponding to provided dbIds', () => {
		const dbIds = datetimes.map(({ dbId }) => dbId);
		const entities = entitiesWithDbIdInArray(datetimes, dbIds);

		expect(entities.length).toBe(datetimes.length);
		entities.forEach((entity, index) => {
			expect(entity.dbId).toBe(dbIds[index]);
		});
	});

	it('should return an array of entities corresponding to provided dbIds and ignore inexisting dbIds', () => {
		const dbIds = [datetimes[0].dbId, 10101002021, datetimes[2].dbId, 12345678910];
		const entities = entitiesWithDbIdInArray(datetimes, dbIds);

		expect(entities.length).toBe(2);
		expect(entities[0].dbId).toBe(dbIds[0]);
		expect(entities[1].dbId).toBe(dbIds[2]);
	});

	it('should return an empty if there is no match', () => {
		const dbIds = [10101002021, 12345678910, 101010020211010100202110101002021];
		const entities = entitiesWithDbIdInArray(datetimes, dbIds);

		expect(entities).toEqual([]);
	});
});

describe('entitiesWithGuIdInArray', () => {
	it('should return an array of entities corresponding to provided ids', () => {
		const ids = getGuids(tickets);
		const entities = entitiesWithGuIdInArray(tickets, ids);

		expect(entities.length).toBe(tickets.length);
		entities.forEach((entity, index) => {
			expect(entity.id).toBe(ids[index]);
		});
	});

	it('should return an array of entities corresponding to provided dbIds and ignore inexisting dbIds', () => {
		const ids = ['a b c d e f g h', tickets[0].id, 'i j k l m n o p q', tickets[1].id, 'r s t u v w x y z'];
		const entities = entitiesWithGuIdInArray(tickets, ids);

		expect(entities.length).toBe(2);
		expect(entities[0].id).toBe(ids[1]);
		expect(entities[1].id).toBe(ids[3]);
	});

	it('should return an empty if there is no match', () => {
		const ids = ['a b c d e f g h', 'i j k l m n o p q', 'r s t u v w x y z'];
		const entities = entitiesWithGuIdInArray(tickets, ids);

		expect(entities).toEqual([]);
	});
});
