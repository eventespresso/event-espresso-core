import { getQueryString } from '../';

describe( 'getQueryString()', () => {
	const sampleQueryData = {
		limit: 10,
		order: 'asc',
		orderBy: 'ticket_start_date',
	};
	const sampleWhereConditions = () => {
		return 'EVT_ID=10';
	};
	const sampleMapOrderBy = () => {
		return 'Ticket.Datetime.EVT_start_date';
	};
	it( 'returns an empty string with all defaults', () => {
		expect( getQueryString() ).toEqual( '' );
	} );
	it( 'uses the expected passed in values for queryData', () => {
		expect(
			getQueryString( sampleQueryData ),
		).toEqual(
			'limit=10&order=asc&order_by=ticket_start_date',
		);
	} );
	it( 'uses passed in whereConditions callback', () => {
		expect(
			getQueryString( sampleQueryData, sampleWhereConditions ),
		).toEqual(
			'limit=10&order=asc&order_by=ticket_start_date&EVT_ID=10',
		);
	} );
	it( 'uses passed in mapOrderBy callback', () => {
		expect(
			getQueryString( sampleQueryData, undefined, sampleMapOrderBy ),
		).toEqual(
			'limit=10&order=asc&order_by=Ticket.Datetime.EVT_start_date',
		);
	} );
} );
