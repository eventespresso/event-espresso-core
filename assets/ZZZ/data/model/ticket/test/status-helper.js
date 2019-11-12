/**
 * External imports
 */
import { AuthedTicketResponse, TicketFactory } from '@test/fixtures';
import { DateTime } from '@eventespresso/value-objects';

/**
 * Internal imports
 */
import {
	isOnSale,
	isExpired,
	isSoldOut,
	isArchived,
	isPending,
	status,
	getBackgroundColorClass,
	getTicketStatusTextLabel,
} from '../status-helper';
import { TICKET_STATUS_ID } from '../constants';

// test objects
const getTicketEntity = () => TicketFactory.fromExisting(
	{ ...AuthedTicketResponse, TKT_ID: 10 }
);
const inValidTicketEntity = { id: 10, name: 'no ticket for you' };
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

const onSaleTicketEntity = () => {
	const ticketEntity = getTicketEntity();
	ticketEntity.startDate = new DateTime( lastWeek.toISOString() );
	ticketEntity.endDate = new DateTime( nextWeek.toISOString() );
	return ticketEntity;
};
const expiredTicketEntity = () => {
	const ticketEntity = getTicketEntity();
	ticketEntity.startDate = new DateTime( lastMonth.toISOString() );
	ticketEntity.endDate = new DateTime( lastWeek.toISOString() );
	return ticketEntity;
};
const pendingTicketEntity = () => {
	const ticketEntity = getTicketEntity();
	ticketEntity.startDate = new DateTime( nextWeek.toISOString() );
	ticketEntity.endDate = new DateTime( nextMonth.toISOString() );
	return ticketEntity;
};
const archivedTicketEntity = () => {
	const ticketEntity = getTicketEntity();
	ticketEntity.deleted = true;
	return ticketEntity;
};
const soldOutTicketEntity = () => {
	const ticketEntity = pendingTicketEntity();
	ticketEntity.qty = 100;
	ticketEntity.sold = 100;
	return ticketEntity;
};
const noCapacityTicketEntity = () => {
	const ticketEntity = pendingTicketEntity();
	ticketEntity.qty = null;
	return ticketEntity;
};

describe( 'TicketEntity Status "is" Conditionals', () => {
	it( 'throw errors when invalid Ticket Entity supplied', () => {
		expect( () => isOnSale( inValidTicketEntity ) ).toThrow( TypeError );
		expect( () => isExpired( inValidTicketEntity ) ).toThrow( TypeError );
		expect( () => isSoldOut( inValidTicketEntity ) ).toThrow( TypeError );
		expect( () => isArchived( inValidTicketEntity ) ).toThrow( TypeError );
		expect( () => isPending( inValidTicketEntity ) ).toThrow( TypeError );
	} );
	it( 'do not throw errors when a valid Ticket Entity supplied', () => {
		const validTicketEntity = getTicketEntity();
		expect( () => isOnSale( validTicketEntity ) ).not.toThrow( TypeError );
		expect( () => isExpired( validTicketEntity ) ).not.toThrow( TypeError );
		expect( () => isSoldOut( validTicketEntity ) ).not.toThrow( TypeError );
		expect( () => isArchived( validTicketEntity ) ).not.toThrow( TypeError );
		expect( () => isPending( validTicketEntity ) ).not.toThrow( TypeError );
	} );
	describe( 'isOnSale()', () => {
		it( 'returns false if Ticket Entity sale dates are in future',
			() => {
				expect( isOnSale( pendingTicketEntity() ) ).toBe( false );
			}
		);
		it( 'returns false if Ticket Entity sale dates are in past',
			() => {
				expect( isOnSale( expiredTicketEntity() ) ).toBe( false );
			}
		);
		it( 'returns true if Ticket Entity sale dates "straddle" current time',
			() => {
				expect( isOnSale( onSaleTicketEntity() ) ).toBe( true );
			}
		);
	} );
	describe( 'isExpired()', () => {
		it( 'returns false if Ticket Entity sale dates are in future',
			() => {
				expect( isExpired( pendingTicketEntity() ) ).toBe( false );
			}
		);
		it( 'returns false if Ticket Entity sale dates "straddle" current time',
			() => {
				expect( isExpired( onSaleTicketEntity() ) ).toBe( false );
			}
		);
		it( 'returns true if Ticket Entity sale dates are in past',
			() => {
				expect( isExpired( expiredTicketEntity() ) ).toBe( true );
			}
		);
	} );
	describe( 'isPending()', () => {
		it( 'returns false if Ticket Entity sale dates are in past',
			() => {
				expect( isPending( expiredTicketEntity() ) ).toBe( false );
			}
		);
		it( 'returns false if Ticket Entity sale dates "straddle" current time',
			() => {
				expect( isPending( onSaleTicketEntity() ) ).toBe( false );
			}
		);
		it( 'returns true if Ticket Entity sale dates are in future',
			() => {
				expect( isPending( pendingTicketEntity() ) ).toBe( true );
			}
		);
		it( 'returns true if Ticket Entity sale dates are far in future',
			() => {
				expect( isPending( pendingTicketEntity() ) ).toBe( true );
			}
		);
	} );
	describe( 'isSoldOut()', () => {
		const ticketEntity = pendingTicketEntity();
		it( 'returns false if Ticket Entity quantity is null', () => {
			ticketEntity.qty = null;
			expect( isSoldOut( ticketEntity ) ).toBe( false );
		} );
		it( 'returns false if Ticket Entity quantity is "-1', () => {
			ticketEntity.qty = -1;
			expect( isSoldOut( ticketEntity ) ).toBe( false );
		} );
		it( 'returns false if Ticket Entity quantity is set and sold is 0', () => {
			ticketEntity.qty = 100;
			ticketEntity.sold = 0;
			expect( isSoldOut( ticketEntity ) ).toBe( false );
		} );
		it( 'returns false if Ticket Entity quantity is more than sold', () => {
			ticketEntity.qty = 100;
			ticketEntity.sold = 99;
			expect( isSoldOut( ticketEntity ) ).toBe( false );
		} );
		it( 'returns true if Ticket Entity quantity equals sold', () => {
			ticketEntity.qty = 100;
			ticketEntity.sold = 100;
			expect( isSoldOut( ticketEntity ) ).toBe( true );
		} );
		it( 'returns true if Ticket Entity quantity is less than sold', () => {
			ticketEntity.qty = 100;
			ticketEntity.sold = 110;
			expect( isSoldOut( ticketEntity ) ).toBe( true );
		} );
	} );
	describe( 'isArchived()', () => {
		it( 'returns false if Ticket Entity is not archived',
			() => {
				expect( isArchived( pendingTicketEntity() ) ).toBe( false );
			}
		);
		it( 'returns true if Ticket Entity quantity is archived',
			() => {
				expect( isArchived( archivedTicketEntity() ) ).toBe( true );
			}
		);
	} );
} );

describe( 'TicketEntity Status Helpers', () => {
	it( 'throw errors when invalid Ticket Entity supplied', () => {
		expect(
			() => status( inValidTicketEntity )
		).toThrow( TypeError );
		expect(
			() => getBackgroundColorClass( inValidTicketEntity )
		).toThrow( TypeError );
		expect(
			() => getTicketStatusTextLabel( inValidTicketEntity )
		).toThrow( TypeError );
	} );
	describe( 'status() returns correct status code for valid Ticket Entity', () => {
		let ticketEntity;
		it( 'is "TKA" when ARCHIVED', () => {
			ticketEntity = archivedTicketEntity();
			expect( status( ticketEntity ) ).toEqual(
				TICKET_STATUS_ID.ARCHIVED
			);
			expect( status( ticketEntity ) ).toEqual( 'TKA' );
		} );
		it( 'is not "TKA" when not ARCHIVED', () => {
			ticketEntity = pendingTicketEntity();
			expect( status( ticketEntity ) ).not.toEqual(
				TICKET_STATUS_ID.ARCHIVED
			);
			expect( status( ticketEntity ) ).not.toEqual( 'TKA' );
		} );
		it( 'is "TKE" when EXPIRED', () => {
			ticketEntity = expiredTicketEntity();
			expect( status( ticketEntity ) ).toEqual(
				TICKET_STATUS_ID.EXPIRED
			);
			expect( status( ticketEntity ) ).toEqual( 'TKE' );
		} );
		it( 'is not "TKE" when not EXPIRED', () => {
			ticketEntity = pendingTicketEntity();
			expect( status( ticketEntity ) ).not.toEqual(
				TICKET_STATUS_ID.EXPIRED
			);
			expect( status( ticketEntity ) ).not.toEqual( 'TKE' );
		} );
		it( 'is "TKS" when SOLD_OUT', () => {
			ticketEntity = soldOutTicketEntity();
			expect( status( ticketEntity ) ).toEqual(
				TICKET_STATUS_ID.SOLD_OUT
			);
			expect( status( ticketEntity ) ).toEqual( 'TKS' );
		} );
		it( 'is not "TKS" when not SOLD_OUT', () => {
			ticketEntity = noCapacityTicketEntity();
			expect( status( ticketEntity ) ).not.toEqual(
				TICKET_STATUS_ID.SOLD_OUT
			);
			expect( status( ticketEntity ) ).not.toEqual( 'TKS' );
		} );
		it( 'is "TKP" when PENDING', () => {
			ticketEntity = pendingTicketEntity();
			expect( status( ticketEntity ) ).toEqual(
				TICKET_STATUS_ID.PENDING
			);
			expect( status( ticketEntity ) ).toEqual( 'TKP' );
		} );
		it( 'is not "TKP" when not PENDING', () => {
			ticketEntity = onSaleTicketEntity();
			expect( status( ticketEntity ) ).not.toEqual(
				TICKET_STATUS_ID.PENDING
			);
			expect( status( ticketEntity ) ).not.toEqual( 'TKP' );
		} );
		it( 'is "TKO" when ONSALE', () => {
			ticketEntity = onSaleTicketEntity();
			expect( status( ticketEntity ) ).toEqual(
				TICKET_STATUS_ID.ONSALE
			);
			expect( status( ticketEntity ) ).toEqual( 'TKO' );
		} );
		it( 'is not "TKO" when not ONSALE', () => {
			ticketEntity = pendingTicketEntity();
			expect( status( ticketEntity ) ).not.toEqual(
				TICKET_STATUS_ID.ONSALE
			);
			expect( status( ticketEntity ) ).not.toEqual( 'TKO' );
		} );
	} );
	describe( 'getBackgroundColorClass() returns correct CSS class for valid Ticket Entity', () => {
		let ticketEntity;
		it( 'is "TKA" when ARCHIVED', () => {
			ticketEntity = archivedTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).toEqual(
				`ee-status-background-color-TKA`
			);
		} );
		it( 'is not "TKA" when not ARCHIVED', () => {
			ticketEntity = pendingTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).not.toEqual(
				`ee-status-background-color-TKA`
			);
		} );
		it( 'is "TKE" when EXPIRED', () => {
			ticketEntity = expiredTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).toEqual(
				`ee-status-background-color-TKE`
			);
		} );
		it( 'is not "TKE" when not EXPIRED', () => {
			ticketEntity = pendingTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).not.toEqual(
				`ee-status-background-color-TKE`
			);
		} );
		it( 'is "TKS" when SOLD_OUT', () => {
			ticketEntity = soldOutTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).toEqual(
				`ee-status-background-color-TKS`
			);
		} );
		it( 'is not "TKS" when not SOLD_OUT', () => {
			ticketEntity = noCapacityTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).not.toEqual(
				`ee-status-background-color-TKS`
			);
		} );
		it( 'is "TKP" when PENDING', () => {
			ticketEntity = pendingTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).toEqual(
				`ee-status-background-color-TKP`
			);
		} );
		it( 'is not "TKP" when not PENDING', () => {
			ticketEntity = onSaleTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).not.toEqual(
				`ee-status-background-color-TKP`
			);
		} );
		it( 'is "TKO" when ONSALE', () => {
			ticketEntity = onSaleTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).toEqual(
				`ee-status-background-color-TKO`
			);
		} );
		it( 'is not "TKO" when not ONSALE', () => {
			ticketEntity = pendingTicketEntity();
			expect( getBackgroundColorClass( ticketEntity ) ).not.toEqual(
				`ee-status-background-color-TKO`
			);
		} );
	} );
	describe( 'getTicketStatusTextLabel() returns correct status label for valid Ticket Entity', () => {
		let ticketEntity;
		it( 'is "archived" when ARCHIVED', () => {
			ticketEntity = archivedTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).toEqual(
				'archived'
			);
		} );
		it( 'is not "archived" when not ARCHIVED', () => {
			ticketEntity = pendingTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).not.toEqual(
				'archived'
			);
		} );
		it( 'is "expired" when EXPIRED', () => {
			ticketEntity = expiredTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).toEqual(
				'expired'
			);
		} );
		it( 'is not "expired" when not EXPIRED', () => {
			ticketEntity = pendingTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).not.toEqual(
				'expired'
			);
		} );
		it( 'is "sold out" when SOLD_OUT', () => {
			ticketEntity = soldOutTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).toEqual(
				'sold out'
			);
		} );
		it( 'is not "sold out" when not SOLD_OUT', () => {
			ticketEntity = noCapacityTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).not.toEqual(
				'sold out'
			);
		} );
		it( 'is "pending" when PENDING', () => {
			ticketEntity = pendingTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).toEqual(
				'pending'
			);
		} );
		it( 'is not "pending" when not PENDING', () => {
			ticketEntity = onSaleTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).not.toEqual(
				'pending'
			);
		} );
		it( 'is "on sale" when ONSALE', () => {
			ticketEntity = onSaleTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).toEqual(
				'on sale'
			);
		} );
		it( 'is not "on sale" when not ONSALE', () => {
			ticketEntity = pendingTicketEntity();
			expect( getTicketStatusTextLabel( ticketEntity ) ).not.toEqual(
				'on sale'
			);
		} );
	} );
} );
