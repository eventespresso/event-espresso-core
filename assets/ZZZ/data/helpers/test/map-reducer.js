/**
 * Internal import
 */
import { mapReducer } from '../map-reducer';

describe( 'mapReducer()', () => {
	const map = new Map();
	const expectedAccumulator = { foo: 'bar', bar: 'foo' };
	const reducerCallback = ( accumulator, value, key ) => {
		accumulator[ key ] = value;
		return accumulator;
	};
	map.set( 'foo', 'bar' );
	map.set( 'bar', 'foo' );
	it( 'returns the expected result for given arguments', () => {
		expect( mapReducer( map, reducerCallback, {} ) )
			.toEqual( expectedAccumulator );
	} );
} );
