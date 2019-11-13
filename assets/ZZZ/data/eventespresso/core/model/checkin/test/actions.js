import { dispatch, fetch, resolveSelect } from '../../../../base-controls';
import {
	CheckinFactory,
	AuthedCheckinResponse,
	AuthedCheckinEntity,
} from '@test/fixtures';
import { InvalidModelEntity } from '@eventespresso/eejs';
import { getEndpoint } from '@eventespresso/model';

/**
 * Internal imports
 */
import { receiveLatestCheckin, toggleCheckin } from '../actions';
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

describe( 'receiveLatestCheckin()', () => {
	let fulfillment;
	const reset = ( checkinEntity ) => fulfillment = receiveLatestCheckin(
		checkinEntity,
		10,
		20
	);
	it( 'throws an error when the incoming entity is not a checkin ' +
		'entity', () => {
		reset( {} );
		expect( () => fulfillment.next() ).toThrow( InvalidModelEntity );
	} );
	it( 'yields the dispatch action for receiveEntity', () => {
		reset( AuthedCheckinEntity );
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				REDUCER_KEY,
				'receiveEntity',
				AuthedCheckinEntity,
			)
		);
	} );
	it( 'yields the dispatch action for finishing the resolution on ' +
		'getEntityById', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				REDUCER_KEY,
				'getEntityById',
				[ 'checkin', AuthedCheckinEntity.id ]
			)
		);
	} );
	it( 'yields the dispatch action for receiveSelectorValue', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				REDUCER_KEY,
				'receiveSelectorValue',
				'getLatestCheckin',
				AuthedCheckinEntity.id,
				10,
				20
			)
		);
	} );
	it( 'yields the dispatch action for finishing the resolution on ' +
		'getLatestCheckin', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				REDUCER_KEY,
				'getLatestCheckin',
				[ 10, 20 ]
			)
		);
	} );
} );

describe( 'toggleCheckin', () => {
	let fulfillment;
	const reset = () => fulfillment = toggleCheckin(
		10,
		20
	);
	const rewind = () => {
		fetchDoActual();
		reset();
		fulfillment.next();
		fulfillment.next( AuthedCheckinResponse );
	};
	describe( 'when the fetch throws an error', () => {
		it( 'yields a dispatch action for an error notice', () => {
			reset();
			fetchThrowError( { code: 500 } );
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				dispatch(
					'core/notices',
					'createErrorNotice',
					'Toggling the checkin failed. Usually this is due to the checkin not having access'
				)
			);
		} );
		it( 'returns null', () => {
			const { value, done } = fulfillment.next();
			expect( value ).toBeNull();
			expect( done ).toBe( true );
		} );
	} );
	it( 'yields dispatch action for toggling the checkin state via api', () => {
		fetchDoActual();
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			fetch( {
				path: getEndpoint( 'registration' ) +
					'/10/toggle_checkin_for_datetime/20',
				method: 'POST',
				data: {
					force: false,
				},
			} )
		);
	} );
	it( 'yields select action for getting the factory', () => {
		const { value } = fulfillment.next( AuthedCheckinResponse );
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getFactoryForModel',
				'checkin'
			)
		);
	} );
	it( 'returns null when factory is not available', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBeNull();
		expect( done ).toBe( true );
		expect( console ).toHaveErrored();
	} );
	it( 'yields dispatch action for new checkin when factory is successfully ' +
		'retrieved', () => {
		rewind();
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
	it( 'returns new checkin entity', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( AuthedCheckinEntity );
		expect( done ).toBe( true );
	} );
} );
