import {
	data,
	Exception,
	mergeAndDeDuplicateArrays,
	mergeAndDeDuplicateObjects,
} from '../index.js';

describe( 'eejs', () => {
	describe( 'data', () => {
		it( 'ensures data object gets set from eejsdata.data global', () => {
			expect( data.testData ).toBe( true );
		} );
	} );

	describe( 'Exception', () => {
		const t = () => {
			throw new Exception( 'error thrown' );
		};
		it( 'should throw error with msg "error thrown"', () => {
			expect( t ).toThrowError( 'error thrown' );
		} );
		it( 'should throw an error which is an instance of "Exception"', () => {
			expect( t ).toThrow( Exception );
		} );
	} );

	describe( 'mergeAndDeDuplicateArrays()', () => {
		it( 'merges arrays and removes duplicate values from the final' +
			' array', () => {
			expect(
				mergeAndDeDuplicateArrays( [ 1, 2, 3 ],
					[ 2, 3, 4 ],
					[ 4, 5, 6, 7 ],
				),
			).toEqual(
				[ 1, 2, 3, 4, 5, 6, 7 ],
			);
		} );
	} );

	describe( 'mergeAndDeDuplicateObjects()', () => {
		it( 'merges arrays of objects and removes duplicate objects from' +
			' the final array using the provided property as the' +
			' predicate', () => {
			expect(
				mergeAndDeDuplicateObjects( 'id',
					[
						{ id: 10, name: 'ten' },
						{ id: 30, name: 'thirty' },
						{ id: 25, name: 'twenty-five' },
					],
					[
						{ id: 10, name: 'ten' },
						{ id: 50, name: 'fifty' },
					],
					[
						{ id: 30, name: 'thirty' },
						{ id: 15, name: 'fifteen' },
					],
				),
			).toEqual(
				[
					{ id: 10, name: 'ten' },
					{ id: 30, name: 'thirty' },
					{ id: 25, name: 'twenty-five' },
					{ id: 50, name: 'fifty' },
					{ id: 15, name: 'fifteen' },
				],
			);
		} );
	} );
} );
