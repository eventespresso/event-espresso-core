/**
 * External imports
 */
import { AuthedDateTimeResponse, DateTimeFactory } from '@test/fixtures';
import { DateTime } from '@eventespresso/value-objects';

/**
 * Internal imports
 */
import {
	isActive,
	isExpired,
	isRecentlyExpired,
	isSoldOut,
	isTrashed,
	isUpcoming,
	status,
	getBackgroundColorClass,
	getDateTimeStatusTextLabel,
} from '../status-helper';
import { DATETIME_STATUS_ID } from '../constants';

// test objects
const getDateEntity = () => DateTimeFactory.fromExisting(
	{ ...AuthedDateTimeResponse, DTT_ID: 10 }
);
const inValidDateEntity = { id: 10, name: 'no date for you' };
const today = new Date();
const nextWeek = new Date();
const nextMonth = new Date();
const lastWeek = new Date();
const lastMonth = new Date();
const oneMonthFromNow = new Date();
const twoMonthsFromNow = new Date();
const oneMonthAgo = new Date();
const twoMonthsAgo = new Date();
nextWeek.setDate( today.getDate() + 7 );
nextMonth.setDate( today.getDate() + 30 );
lastWeek.setDate( today.getDate() - 7 );
lastMonth.setDate( today.getDate() - 30 );
oneMonthAgo.setDate( today.getDate() - 32 );
twoMonthsAgo.setDate( today.getDate() - 62 );
oneMonthFromNow.setDate( today.getDate() + 32 );
twoMonthsFromNow.setDate( today.getDate() + 62 );

const activeDateEntity = () => {
	const dateEntity = getDateEntity();
	dateEntity.start = new DateTime( lastWeek.toISOString() );
	dateEntity.end = new DateTime( nextWeek.toISOString() );
	return dateEntity;
};
const expiredDateEntity = () => {
	const dateEntity = getDateEntity();
	dateEntity.start = new DateTime( lastMonth.toISOString() );
	dateEntity.end = new DateTime( lastWeek.toISOString() );
	return dateEntity;
};
const reallyOldDateEntity = () => {
	const dateEntity = getDateEntity();
	dateEntity.start = new DateTime( twoMonthsAgo.toISOString() );
	dateEntity.end = new DateTime( oneMonthAgo.toISOString() );
	return dateEntity;
};
const upcomingDateEntity = () => {
	const dateEntity = getDateEntity();
	dateEntity.start = new DateTime( nextWeek.toISOString() );
	dateEntity.end = new DateTime( nextMonth.toISOString() );
	return dateEntity;
};
const trashedDateEntity = () => {
	const dateEntity = getDateEntity();
	dateEntity.deleted = true;
	return dateEntity;
};
const soldOutDateEntity = () => {
	const dateEntity = upcomingDateEntity();
	dateEntity.regLimit = 100;
	dateEntity.sold = 100;
	return dateEntity;
};
const noCapacityDateEntity = () => {
	const dateEntity = upcomingDateEntity();
	dateEntity.regLimit = null;
	return dateEntity;
};

describe( 'DateEntity Status "is" Conditionals', () => {
	it( 'throw errors when invalid Date Entity supplied', () => {
		expect( () => isActive( inValidDateEntity ) ).toThrow( TypeError );
		expect( () => isExpired( inValidDateEntity ) ).toThrow( TypeError );
		expect( () => isRecentlyExpired( inValidDateEntity ) ).toThrow( TypeError );
		expect( () => isSoldOut( inValidDateEntity ) ).toThrow( TypeError );
		expect( () => isTrashed( inValidDateEntity ) ).toThrow( TypeError );
		expect( () => isUpcoming( inValidDateEntity ) ).toThrow( TypeError );
	} );
	it( 'do not throw errors when a valid Date Entity supplied', () => {
		const validDateEntity = getDateEntity();
		expect( () => isActive( validDateEntity ) ).not.toThrow( TypeError );
		expect( () => isExpired( validDateEntity ) ).not.toThrow( TypeError );
		expect( () => isRecentlyExpired( validDateEntity ) ).not.toThrow( TypeError );
		expect( () => isSoldOut( validDateEntity ) ).not.toThrow( TypeError );
		expect( () => isTrashed( validDateEntity ) ).not.toThrow( TypeError );
		expect( () => isUpcoming( validDateEntity ) ).not.toThrow( TypeError );
	} );
	describe( 'isActive()', () => {
		it( 'returns false if Date Entity start and end dates are in future',
			() => expect( isActive( upcomingDateEntity() ) ).toBe( false )
		);
		it( 'returns false if Date Entity start and end dates are in past',
			() => expect( isActive( expiredDateEntity() ) ).toBe( false )
		);
		it( 'returns true if Date Entity start and end dates "straddle" current time',
			() => expect( isActive( activeDateEntity() ) ).toBe( true )
		);
	} );
	describe( 'isExpired()', () => {
		it( 'returns false if Date Entity start and end dates are in future',
			() => expect( isExpired( upcomingDateEntity() ) ).toBe( false )
		);
		it( 'returns false if Date Entity start and end dates "straddle" current time',
			() => expect( isExpired( activeDateEntity() ) ).toBe( false )
		);
		it( 'returns true if Date Entity start and end dates are in past',
			() => expect( isExpired( expiredDateEntity() ) ).toBe( true )
		);
	} );
	describe( 'isRecentlyExpired()', () => {
		it( 'returns false if Date Entity start and end dates are in future',
			() => expect( isRecentlyExpired( upcomingDateEntity() ) ).toBe( false )
		);
		it( 'returns false if Date Entity start and end dates "straddle" current time',
			() => {
				expect( isUpcoming( activeDateEntity() ) ).toBe( false );
			}
		);
		it( 'returns false if Date Entity start and end dates are too far in past',
			() => expect( isRecentlyExpired( reallyOldDateEntity() ) ).toBe( false )
		);
		it( 'returns true if Date Entity start and end dates are in past',
			() => expect( isRecentlyExpired( expiredDateEntity() ) ).toBe( true )
		);
	} );
	describe( 'isUpcoming()', () => {
		it( 'returns false if Date Entity start and end dates are in past',
			() => expect( isUpcoming( expiredDateEntity() ) ).toBe( false )
		);
		it( 'returns false if Date Entity start and end dates "straddle" current time',
			() => {
				expect( isUpcoming( activeDateEntity() ) ).toBe( false );
			}
		);
		it( 'returns true if Date Entity start and end dates are in future',
			() => expect( isUpcoming( upcomingDateEntity() ) ).toBe( true )
		);
		it( 'returns true if Date Entity start and end dates are far in future',
			() => expect( isUpcoming( upcomingDateEntity() ) ).toBe( true )
		);
	} );
	describe( 'isSoldOut()', () => {
		const dateEntity = upcomingDateEntity();
		it( 'returns false if Date Entity capacity is null', () => {
			dateEntity.regLimit = null;
			expect( isSoldOut( dateEntity ) ).toBe( false );
		} );
		it( 'returns false if Date Entity capacity is "-1', () => {
			dateEntity.regLimit = -1;
			expect( isSoldOut( dateEntity ) ).toBe( false );
		} );
		it( 'returns false if Date Entity capacity is set and sold is 0', () => {
			dateEntity.regLimit = 100;
			dateEntity.sold = 0;
			expect( isSoldOut( dateEntity ) ).toBe( false );
		} );
		it( 'returns false if Date Entity capacity is more than sold', () => {
			dateEntity.regLimit = 100;
			dateEntity.sold = 99;
			expect( isSoldOut( dateEntity ) ).toBe( false );
		} );
		it( 'returns true if Date Entity capacity equals sold', () => {
			dateEntity.regLimit = 100;
			dateEntity.sold = 100;
			expect( isSoldOut( dateEntity ) ).toBe( true );
		} );
		it( 'returns true if Date Entity capacity is less than sold', () => {
			dateEntity.regLimit = 100;
			dateEntity.sold = 110;
			expect( isSoldOut( dateEntity ) ).toBe( true );
		} );
	} );
	describe( 'isTrashed()', () => {
		it( 'returns false if Date Entity is not deleted',
			() => expect( isTrashed( upcomingDateEntity() ) ).toBe( false )
		);
		it( 'returns true if Date Entity capacity is deleted',
			() => expect( isTrashed( trashedDateEntity() ) ).toBe( true )
		);
	} );
} );

describe( 'DateEntity Status Helpers', () => {
	it( 'throw errors when invalid Date Entity supplied', () => {
		expect(
			() => status( inValidDateEntity )
		).toThrow( TypeError );
		expect(
			() => getBackgroundColorClass( inValidDateEntity )
		).toThrow( TypeError );
		expect(
			() => getDateTimeStatusTextLabel( inValidDateEntity )
		).toThrow( TypeError );
	} );
	describe( 'status() returns correct status code for valid Date Entity', () => {
		let dateEntity;
		it( 'is "DTT" when TRASHED', () => {
			dateEntity = trashedDateEntity();
			expect( status( dateEntity ) ).toEqual(
				DATETIME_STATUS_ID.TRASHED
			);
			expect( status( dateEntity ) ).toEqual( 'DTT' );
		} );
		it( 'is not "DTT" when not TRASHED', () => {
			dateEntity = upcomingDateEntity();
			expect( status( dateEntity ) ).not.toEqual(
				DATETIME_STATUS_ID.TRASHED
			);
			expect( status( dateEntity ) ).not.toEqual( 'DTT' );
		} );
		it( 'is "DTE" when EXPIRED', () => {
			dateEntity = expiredDateEntity();
			expect( status( dateEntity ) ).toEqual(
				DATETIME_STATUS_ID.EXPIRED
			);
			expect( status( dateEntity ) ).toEqual( 'DTE' );
		} );
		it( 'is not "DTE" when not EXPIRED', () => {
			dateEntity = upcomingDateEntity();
			expect( status( dateEntity ) ).not.toEqual(
				DATETIME_STATUS_ID.EXPIRED
			);
			expect( status( dateEntity ) ).not.toEqual( 'DTE' );
		} );
		it( 'is "DTS" when SOLD_OUT', () => {
			dateEntity = soldOutDateEntity();
			expect( status( dateEntity ) ).toEqual(
				DATETIME_STATUS_ID.SOLD_OUT
			);
			expect( status( dateEntity ) ).toEqual( 'DTS' );
		} );
		it( 'is not "DTS" when not SOLD_OUT', () => {
			dateEntity = noCapacityDateEntity();
			expect( status( dateEntity ) ).not.toEqual(
				DATETIME_STATUS_ID.SOLD_OUT
			);
			expect( status( dateEntity ) ).not.toEqual( 'DTS' );
		} );
		it( 'is "DTU" when UPCOMING', () => {
			dateEntity = upcomingDateEntity();
			expect( status( dateEntity ) ).toEqual(
				DATETIME_STATUS_ID.UPCOMING
			);
			expect( status( dateEntity ) ).toEqual( 'DTU' );
		} );
		it( 'is not "DTU" when not UPCOMING', () => {
			dateEntity = activeDateEntity();
			expect( status( dateEntity ) ).not.toEqual(
				DATETIME_STATUS_ID.UPCOMING
			);
			expect( status( dateEntity ) ).not.toEqual( 'DTU' );
		} );
		it( 'is "DTA" when ACTIVE', () => {
			dateEntity = activeDateEntity();
			expect( status( dateEntity ) ).toEqual(
				DATETIME_STATUS_ID.ACTIVE
			);
			expect( status( dateEntity ) ).toEqual( 'DTA' );
		} );
		it( 'is not "DTA" when not ACTIVE', () => {
			dateEntity = upcomingDateEntity();
			expect( status( dateEntity ) ).not.toEqual(
				DATETIME_STATUS_ID.ACTIVE
			);
			expect( status( dateEntity ) ).not.toEqual( 'DTA' );
		} );
	} );
	describe( 'getBackgroundColorClass() returns correct CSS class for valid Date Entity', () => {
		let dateEntity;
		it( 'is "DTT" when TRASHED', () => {
			dateEntity = trashedDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).toEqual(
				`ee-status-background-color-DTT`
			);
		} );
		it( 'is not "DTT" when not TRASHED', () => {
			dateEntity = upcomingDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).not.toEqual(
				`ee-status-background-color-DTT`
			);
		} );
		it( 'is "DTE" when EXPIRED', () => {
			dateEntity = expiredDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).toEqual(
				`ee-status-background-color-DTE`
			);
		} );
		it( 'is not "DTE" when not EXPIRED', () => {
			dateEntity = upcomingDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).not.toEqual(
				`ee-status-background-color-DTE`
			);
		} );
		it( 'is "DTS" when SOLD_OUT', () => {
			dateEntity = soldOutDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).toEqual(
				`ee-status-background-color-DTS`
			);
		} );
		it( 'is not "DTS" when not SOLD_OUT', () => {
			dateEntity = noCapacityDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).not.toEqual(
				`ee-status-background-color-DTS`
			);
		} );
		it( 'is "DTU" when UPCOMING', () => {
			dateEntity = upcomingDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).toEqual(
				`ee-status-background-color-DTU`
			);
		} );
		it( 'is not "DTU" when not UPCOMING', () => {
			dateEntity = activeDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).not.toEqual(
				`ee-status-background-color-DTU`
			);
		} );
		it( 'is "DTA" when ACTIVE', () => {
			dateEntity = activeDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).toEqual(
				`ee-status-background-color-DTA`
			);
		} );
		it( 'is not "DTA" when not ACTIVE', () => {
			dateEntity = upcomingDateEntity();
			expect( getBackgroundColorClass( dateEntity ) ).not.toEqual(
				`ee-status-background-color-DTA`
			);
		} );
	} );
	describe( 'getDateTimeStatusTextLabel() returns correct status label for valid Date Entity', () => {
		let dateEntity;
		it( 'is "archived" when TRASHED', () => {
			dateEntity = trashedDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).toEqual(
				'archived'
			);
		} );
		it( 'is not "archived" when not TRASHED', () => {
			dateEntity = upcomingDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).not.toEqual(
				'archived'
			);
		} );
		it( 'is "expired" when EXPIRED', () => {
			dateEntity = expiredDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).toEqual(
				'expired'
			);
		} );
		it( 'is not "expired" when not EXPIRED', () => {
			dateEntity = upcomingDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).not.toEqual(
				'expired'
			);
		} );
		it( 'is "sold out" when SOLD_OUT', () => {
			dateEntity = soldOutDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).toEqual(
				'sold out'
			);
		} );
		it( 'is not "sold out" when not SOLD_OUT', () => {
			dateEntity = noCapacityDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).not.toEqual(
				'sold out'
			);
		} );
		it( 'is "upcoming" when UPCOMING', () => {
			dateEntity = upcomingDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).toEqual(
				'upcoming'
			);
		} );
		it( 'is not "upcoming" when not UPCOMING', () => {
			dateEntity = activeDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).not.toEqual(
				'upcoming'
			);
		} );
		it( 'is "active" when ACTIVE', () => {
			dateEntity = activeDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).toEqual(
				'active'
			);
		} );
		it( 'is not "active" when not ACTIVE', () => {
			dateEntity = upcomingDateEntity();
			expect( getDateTimeStatusTextLabel( dateEntity ) ).not.toEqual(
				'active'
			);
		} );
	} );
} );
