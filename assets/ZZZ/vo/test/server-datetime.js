import ServerDateTime from '../date-time/server-date-time';
import * as defaults from '../date-time/defaults';

describe( 'ServerDateTime', () => {
	beforeEach( () => resetDefaults() );

	// this is the representation of the testDateValues object as milliseconds
	// from Unix Epoch (assuming testDateValues is in UTC).
	const testDateValueInMilliseconds = 1545732900200;

	const resetDefaults = () => {
		// noinspection JSUnresolvedVariable
		defaults.HAS_TIMEZONE_STRING = true;
		// noinspection JSUnresolvedVariable
		defaults.DEFAULT_OFFSET = 0;
	};

	const setHasNoTimezoneString = () => {
		// noinspection JSUnresolvedVariable
		defaults.HAS_TIMEZONE_STRING = false;
	};
	const setDefaultOffsetTo = ( offset ) => {
		// noinspection JSUnresolvedVariable
		defaults.DEFAULT_OFFSET = offset;
	};
	describe( 'constructor with timezone string', () => {
		const testDate = new ServerDateTime(
			new Date( testDateValueInMilliseconds ).toISOString()
		);
		it( 'constructs an instance of ServerDateTime', () => {
			expect( testDate ).toBeInstanceOf( ServerDateTime );
		} );
		it( 'has set timezone string to expected value', () => {
			expect( testDate.timezone ).toBe( 'UTC' );
		} );
		it( 'has set locale to expected value', () => {
			expect( testDate.locale ).toBe( 'en' );
		} );
		it( 'has set offset to expected value', () => {
			expect( testDate.offset ).toBe( 0 );
		} );
	} );
	describe( 'constructor with offset', () => {
		setHasNoTimezoneString();
		const testDate = new ServerDateTime(
			new Date( testDateValueInMilliseconds ).toISOString()
		);
		it( 'constructs an instance of ServerDateTime', () => {
			expect( testDate ).toBeInstanceOf( ServerDateTime );
		} );
		it( 'has set timezone string to expected value', () => {
			expect( testDate.timezone ).toBe( undefined );
		} );
		it( 'has set offset to expected value', () => {
			expect( testDate.offset ).toBe( 0 );
		} );
	} );
	describe( 'Extended method tests', () => {
		const testConditions = [
			[
				'fromISO',
				() => new Date( testDateValueInMilliseconds ).toISOString(),
			],
			[
				'fromJSDate',
				() => new Date( testDateValueInMilliseconds ),
			],
		];
		testConditions.forEach( ( testCondition ) => {
			const [ METHOD, getDate ] = testCondition;
			describe( METHOD + '() with default timezone', () => {
				resetDefaults();
				const testDate = ServerDateTime[ METHOD ]( getDate() );
				it( 'returns an instance of ServerDateTime', () => {
					expect( testDate ).toBeInstanceOf( ServerDateTime );
				} );
				it( 'has set timezone string to expected value', () => {
					expect( testDate.timezone ).toBe( 'UTC' );
				} );
				it( 'has set offset to be expected value', () => {
					expect( testDate.offset ).toBe( 0 );
				} );
				it( 'has set locale to be expected value', () => {
					expect( testDate.locale ).toBe( 'en' );
				} );
			} );
			describe( METHOD + '() with default offset', () => {
				setDefaultOffsetTo( -2 );
				setHasNoTimezoneString();
				const testDate = ServerDateTime[ METHOD ]( getDate() );
				it( 'returns an instance of ServerDateTime', () => {
					expect( testDate ).toBeInstanceOf( ServerDateTime );
				} );
				it( 'has set timezone string to expected value', () => {
					expect( testDate.timezone ).toBe( undefined );
				} );
				it( 'has set offset to be expected value', () => {
					expect( testDate.offset ).toBe( -120 );
				} );
				it( 'has set locale to be expected value', () => {
					expect( testDate.locale ).toBe( 'en' );
				} );
			} );
		} );
	} );
	describe( 'fluent setter tests', () => {
		const testDate = ServerDateTime.fromJSDate(
			new Date( testDateValueInMilliseconds )
		);
		describe( 'setTimezone', () => {
			const newDate = testDate.setTimezone( 'America/Vancouver' );
			it( 'returns instance of ServerDateTime', () => {
				expect( newDate ).toBeInstanceOf( ServerDateTime );
				expect( newDate.timezone ).toBe( 'America/Vancouver' );
			} );
		} );
	} );
} );
