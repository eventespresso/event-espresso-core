import { dispatch, fetch, resolveSelect } from '../../../../base-controls';
import {
	CheckinFactory,
	AuthedCheckinResponse,
	AuthedCheckinEntity,
} from '@test/fixtures';
import { getEndpoint } from '@eventespresso/model';

/**
 * Internal imports
 */
import { getLatestCheckin } from '../resolvers';
import { REDUCER_KEY } from '../../../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../../schema/constants';

jest.mock( '../../../../base-controls' );

dispatch.mockImplementation( ( ...args ) => {
	const { dispatch: actualDispatch } = jest.requireActual(
		'../../../../base-controls'
	);
	return actualDispatch( ...args );
} );

resolveSelect.mockImplementation( ( ...args ) => {
	const { resolveSelect: actualSelect } = jest.requireActual(
		'../../../../base-controls'
	);
	return actualSelect( ...args );
} );

const fetchDoActual = () => {
	fetch.mockClear();
	fetch.mockImplementation( ( ...args ) => {
		const { fetch: apiFetch } = jest.requireActual(
			'../../../../base-controls'
		);
		return apiFetch( ...args );
	} );
};

const fetchThrowError = ( error ) => {
	fetch.mockClear();
	fetch.mockImplementation( () => {
		throw error;
	} );
};

describe( 'getLatestCheckin()', () => {
	let fulfillment;
	const reset = () => fulfillment = getLatestCheckin( 10, 20 );
	it( 'returns null when fetch produces error', () => {
		fetchThrowError( { code: 500 } );
		reset();
		const { value, done } = fulfillment.next();
		expect( value ).toBeNull();
		expect( done ).toBe( true );
	} );
	it( 'yields fetch action for getting checkin record', () => {
		fetchDoActual();
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			fetch(
				{
					path: getEndpoint( 'checkin' ) +
						'/?where[REG_ID]=10&where[DTT_ID]=20' +
						'&order_by[CHK_timestamp]=DESC&limit=1',
					method: 'GET',
				}
			)
		);
	} );
	it( 'returns null when fetch returns no checkin record', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBeNull();
		expect( done ).toBe( true );
	} );
	it( 'yields resolveSelect action for getting the checkin factory', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( [ AuthedCheckinResponse ] );
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getFactoryForModel',
				'checkin',
			)
		);
	} );
	it( 'returns null when factory is not retrievable', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBeNull();
		expect( done ).toBe( true );
	} );
	it( 'yields dispatch action for receiving checkin entity to the ' +
		'state', () => {
		reset();
		fulfillment.next();
		fulfillment.next( [ AuthedCheckinResponse ] );
		const { value } = fulfillment.next( CheckinFactory );
		expect( value ).toEqual(
			dispatch(
				REDUCER_KEY,
				'receiveLatestCheckin',
				AuthedCheckinEntity,
				10,
				20,
			)
		);
	} );
	it( 'returns new checkin record', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( AuthedCheckinEntity );
		expect( done ).toBe( true );
	} );
} );
