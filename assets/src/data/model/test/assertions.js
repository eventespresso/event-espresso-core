/**
 * Internal Imports
 */
import {
	assertEntityHasKey,
	assertIsArray,
	assertIsNotEmpty,
	assertIsMap,
} from '../assertions';

/**
 * External imports
 */
import { Exception } from '@eventespresso/eejs';

describe( 'Testing assertion utilities', () => {
	const tester = ( method, args ) => () => method( ...args );
	const testConditions = [
		[
			assertEntityHasKey,
			[ 'foo', { bar: 'foo' }, '' ],
			[ 'foo', { bar: 'foo' }, 'fail' ],
			[ 'foo', { foo: 'bar' }, '' ],
		],
		[
			assertIsArray,
			[ 'foo', '' ],
			[ 'foo', 'fail' ],
			[ [ 1, 2 ], '' ],
		],
		[
			assertIsNotEmpty,
			[ '', '' ],
			[ {}, 'fail' ],
			[ [ 'foo' ], '' ],
		],
		[
			assertIsMap,
			[ {}, '' ],
			[ {}, 'fail' ],
			[ new Map(), '' ],
		],
	];
	testConditions.forEach( ( [
		testMethod,
		throwExceptionArgs,
		customMessageArgs,
		noExceptionArgs,
	] ) => {
		describe( testMethod.name + '()', () => {
			it( 'throws Exception when assertion fails', () => {
				expect(
					tester(
						testMethod,
						throwExceptionArgs
					)
				).toThrow( Exception );
			} );
			it( 'throws Exception with custom message', () => {
				expect(
					tester(
						testMethod,
						customMessageArgs
					)
				).toThrow( 'fail' );
			} );
			it( 'does not throw exception for passing assertion', () => {
				expect(
					tester(
						testMethod,
						noExceptionArgs
					)
				).not.toThrow();
			} );
		} );
	} );
} );
