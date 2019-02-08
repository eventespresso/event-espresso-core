/**
 * Internal Imports
 */
import {
	assertEntityHasKey,
	assertImmutableObjectHasPath,
	assertIsArray,
	assertIsNotEmpty,
	assertIsMap,
} from '../assertions';

/**
 * External imports
 */
import { Exception } from '@eventespresso/eejs';
import { Map as IMap } from 'immutable';

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
			assertImmutableObjectHasPath,
			[ [ 'datetime', 10 ], IMap().set( 'event', IMap().set( 10, {} ) ) ],
			[
				[ 'datetime', 10 ],
				IMap().set( 'event', IMap().set( 10, {} ) ),
				'fail',
			],
			[ [ 'event', 10 ], IMap().set( 'event', IMap().set( 10, {} ) ) ],
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
