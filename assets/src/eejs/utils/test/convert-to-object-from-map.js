/**
 * Internal imports
 */
import { convertToObjectFromMap } from '../convert-to-object-from-map';

describe( 'convertToObjectFromMap()', () => {
	const testMap = new Map();
	const expectedResult = { foo: 'bar', bar: 'foo' };
	testMap.set( 'foo', 'bar' );
	testMap.set( 'bar', 'foo' );
	it( 'returns expected value for the given Map', () => {
		expect( convertToObjectFromMap( testMap ) ).toEqual( expectedResult );
	} );
} );
