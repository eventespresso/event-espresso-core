/**
 * Internal imports
 */
import { isGenerator } from '../is-generator';

describe( 'isGenerator()', () => {
	function* testGenerator() {}
	[
		[ 0, false ],
		[ {}, false ],
		[ null, false ],
		[ 'fail', false ],
		[ function() {}, false ],
		[ true, false ],
		[ testGenerator, false ],
		[ testGenerator(), true ],
	].forEach( ( [
		generator,
		expectedResult,
	] ) => {
		it( 'returns expected result for given value', () => {
			expect( isGenerator( generator ) ).toBe( expectedResult );
		} );
	} );
} );
