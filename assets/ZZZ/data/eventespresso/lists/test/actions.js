/**
 * Internal imports
 */
import {
	resetAllState,
	resetForSelectorAndIdentifier,
	resetGenericItemsWithIdentifier,
	resetEntitiesForModelName,
	resetSpecificStateForSelector,
} from '../actions';
import { RESET_TYPES as resetTypes } from '../action-types';
import { REDUCER_KEY } from '../constants';
import { select, dispatch } from '../../base-controls';
import EquivalentKeyMap from 'equivalent-key-map';

const mockMap = {
	getItems: new EquivalentKeyMap(
		[ [ [ 'foo' ], 'bar' ], [ [ 'hello' ], 'goodbye' ] ]
	),
	getEntities: new EquivalentKeyMap(
		[ [ [ 'events' ], [ 'bar' ] ], [ [ 'datetimes', '?who=is' ], [ 'foo' ] ] ]
	),
	getEntitiesByIds: new EquivalentKeyMap(
		[
			[ [ 'events', [ 10, 20, 30 ] ], [ 'a', 'b', 'c' ] ],
			[ [ 'datetimes', [ 30, 40, 50 ] ], [ 'd', 'e', 'f' ] ],
		]
	),
};

describe( 'resetAllState', () => {
	const fulfillment = resetAllState();
	it( 'yields expected action for resetting the entire state', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			{ type: resetTypes.RESET_ALL_STATE }
		);
	} );
	it( 'yields select action for getting the cached resovlers from ' +
		'the core/data store', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			select(
				'core/data',
				'getCachedResolvers',
				REDUCER_KEY
			)
		);
	} );
	it( 'yields dispatch invalidation for each item in the map', () => {
		const testMap = { getItems: mockMap.getItems };
		const { value } = fulfillment.next( testMap );
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getItems',
				[ 'foo' ]
			)
		);
		const { value: value2 } = fulfillment.next();
		expect( value2 ).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getItems',
				[ 'hello' ]
			)
		);
		const { done } = fulfillment.next();
		expect( done ).toBe( true );
	} );
} );

describe( 'resetForSelectorAndIdentifier', () => {
	let fulfillment;
	const reset = (
		selectorName,
		identifier
	) => fulfillment = resetForSelectorAndIdentifier(
		selectorName,
		identifier
	);
	it( 'yields action for reset state for identifier', () => {
		reset( 'getItems', 'hello' );
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			{
				type: resetTypes.RESET_STATE_FOR_IDENTIFIER,
				identifier: 'hello',
			}
		);
	} );
	it( 'yields select control for getting cached resolvers', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			select(
				'core/data',
				'getCachedResolvers',
				REDUCER_KEY
			)
		);
	} );
	it( 'yields expected dispatch controls for resolution invalidation', () => {
		const { value } = fulfillment.next( mockMap );
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getItems',
				[ 'hello' ]
			)
		);
		const { done } = fulfillment.next();
		expect( done ).toBe( true );
	} );
} );

describe( 'resetGenericItemsWithIdentifier', () => {
	const fulfillment = resetGenericItemsWithIdentifier( 'hello' );
	it( 'returns expected action for generic state reset', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			{
				type: resetTypes.RESET_STATE_FOR_IDENTIFIER,
				identifier: 'hello',
			}
		);
	} );
	it( 'returns expected dispatch action for invalidating resolution', () => {
		fulfillment.next();
		const { value } = fulfillment.next( mockMap );
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getItems',
				[ 'hello' ]
			)
		);
	} );
} );

describe( 'resetEntitiesForModelName', () => {
	const fulfillment = resetEntitiesForModelName( 'events' );
	it( 'yields expected action for resetting the `getEntities` ' +
		'selector', () => {
		fulfillment.next();
		fulfillment.next();
		const { value } = fulfillment.next( mockMap );
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getEntities',
				[ 'events' ]
			)
		);
	} );
	it( 'yields expected action for resetting the getEntitiesByIds ' +
		'selector', () => {
		fulfillment.next();
		fulfillment.next();
		const { value } = fulfillment.next( mockMap );
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getEntitiesByIds',
				[ 'events', [ 10, 20, 30 ] ]
			)
		);
	} );
} );

describe( 'resetSpecificStateForSelector', () => {
	const fulfillment = resetSpecificStateForSelector(
		'getEntities',
		'datetimes',
		'?who=is',
	);
	it( 'yields expected action for resetting the state', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			{
				type: resetTypes.RESET_SPECIFIC_STATE_FOR_IDENTIFIER,
				identifier: 'datetimes',
				queryString: '?who=is',
			}
		);
	} );
	it( 'yields expected dispatch control for invalidating the resolution ' +
		'for the state', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getEntities',
				[ 'datetimes', '?who=is' ]
			)
		);
	} );
} );
