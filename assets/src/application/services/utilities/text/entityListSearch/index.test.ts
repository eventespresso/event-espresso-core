import { Entity } from '@appServices/apollo/types';
import { EntityListSearchProps } from './types';
import entityListSearch from './';

// Create a test entity to add more fields
interface TestEntity extends Entity {
	description: string;
}

const entities: TestEntity[] = [
	{
		id: 'PGF0ZXRpbWU6ODM=',
		dbId: 83,
		name: 'test',
		description: 'some desc',
	},
	{
		id: 'QGF0ZXRpbWU6ODU=',
		dbId: 85,
		name: 'just another entity',
		description: 'test desc',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 86,
		name: 'another title',
		description: null,
	},
];

const searchArgs: EntityListSearchProps<TestEntity> = {
	entities,
	searchFields: ['name', 'description'],
	searchText: '',
};

describe('entityListSearch', () => {
	it('should return two results by name and description', () => {
		const searchResult = entityListSearch({ ...searchArgs, searchText: 'test' });

		expect(Array.isArray(searchResult)).toBe(true);
		expect(searchResult.length).toBe(2);
		expect(searchResult[0].name).toBe('test');
	});

	it('Should return the same result as with trimmed search term', () => {
		const searchResult = entityListSearch({ ...searchArgs, searchText: '    test    ' });

		expect(Array.isArray(searchResult)).toBe(true);
		expect(searchResult.length).toBe(2);
		expect(searchResult[0].name).toBe('test');
	});

	it('should return two results', () => {
		const searchResult = entityListSearch({ ...searchArgs, searchText: 'another' });

		expect(Array.isArray(searchResult)).toBe(true);
		expect(searchResult.length).toBe(2);
		expect(searchResult[0].name).toBe('just another entity');
		expect(searchResult[1].name).toBe('another title');
	});

	it('Should not search anything if search text is just whitespaces', () => {
		const searchResult = entityListSearch({ ...searchArgs, searchText: '          ' });

		expect(Array.isArray(searchResult)).toBe(true);
		expect(searchResult.length).toBe(3);
		expect(searchResult).toEqual(entities);
	});

	it('Should return empty array if empty entity list is provided and no search term is provided ', () => {
		const searchResult = entityListSearch({ ...searchArgs, entities: [], searchText: '' });

		expect(Array.isArray(searchResult)).toBe(true);
		expect(searchResult.length).toBe(0);
		expect(searchResult).toEqual([]);
	});
});
