/**
 * External dependencies
 */
import { omit } from 'ramda';

/**
 * Internal dependencies
 */
import { entityDbId, entityGuId, entityHasDbId } from './index';
import { nodes as datetimes } from '../../../../../domain/eventEditor/data/queries/datetimes/test/data';

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
});
