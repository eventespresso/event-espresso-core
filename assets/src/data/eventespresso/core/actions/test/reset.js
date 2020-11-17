/**
 * External imports.
 */
import EquivalentKeyMap from 'equivalent-key-map';
import { EventEntity } from '@test/fixtures';

/**
 * Internal imports.
 */
import {
	resetAllState,
	resetStateForModel,
	resetAllModelSpecific,
	resetModelSpecificForSelector,
	resetModelSpecificForSelectorAndArgs,
} from '../reset';
import { ACTION_TYPES } from '../action-types';
import { select, dispatch } from '../../../base-controls';
import { REDUCER_KEY } from '../../constants';

const { resets: types } = ACTION_TYPES;

describe('resetAllState()', () => {
	const mockMap = {
		selectorA: new EquivalentKeyMap([
			['foo', 'bar'],
			['hello', 'goodbye'],
		]),
		selectorB: new EquivalentKeyMap([['foo', 'bar']]),
	};
	const fulfillment = resetAllState();

	it('yields action for resetting all state', () => {
		const { value } = fulfillment.next();
		expect(value).toEqual({ type: types.RESET_ALL_STATE });
	});

	it('yields select control for getting cached resolvers', () => {
		const { value } = fulfillment.next();
		expect(value).toEqual(
			select('core/data', 'getCachedResolvers', REDUCER_KEY)
		);
	});

	it(
		'yields expected actions for dispatching the invalidation of ' +
			'resolvers existing in the state',
		() => {
			const { value: selectorAargs1 } = fulfillment.next(mockMap);
			expect(selectorAargs1).toEqual(
				dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					'selectorA',
					'foo'
				)
			);
			const { value: selectorAargs2 } = fulfillment.next();
			expect(selectorAargs2).toEqual(
				dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					'selectorA',
					'hello'
				)
			);
			const { value: selectorB } = fulfillment.next();
			expect(selectorB).toEqual(
				dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					'selectorB',
					'foo'
				)
			);
		}
	);
});

describe('resetStateForModel()', () => {
	const mockMap = {
		eventInSelectorName: new EquivalentKeyMap([['foo', 'bar']]),
		argsWithModelName: new EquivalentKeyMap([[[10, 'event'], 'hello']]),
		shouldNotAppear: new EquivalentKeyMap(),
		getLatestCheckin: new EquivalentKeyMap(),
		argsWithBaseEntity: new EquivalentKeyMap([
			[[EventEntity, 'datetime'], false],
		]),
	};
	const fulfillment = resetStateForModel('event');
	it('yields action for resetting the state for the model', () => {
		const { value } = fulfillment.next();
		expect(value).toEqual({
			type: types.RESET_STATE_FOR_MODEL,
			modelName: 'event',
		});
	});
	it('yields selector control action for getting cached resolvers', () => {
		const { value } = fulfillment.next();
		expect(value).toEqual(
			select('core/data', 'getCachedResolvers', REDUCER_KEY)
		);
	});
	it(
		'yields expected dispatch control actions for returned ' + 'resolvers',
		() => {
			// note this also indirectly tests:
			// - any selector that does not have model in the selector name or
			//   in args is used.
			const { value: eventInSelectorNameDispatch } = fulfillment.next(
				mockMap
			);
			expect(eventInSelectorNameDispatch).toEqual(
				dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					'eventInSelectorName',
					'foo'
				)
			);
			const { value: argsWithModelNameDispatch } = fulfillment.next();
			expect(argsWithModelNameDispatch).toEqual(
				dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					'argsWithModelName',
					[10, 'event']
				)
			);
			const { value: argsWithBaseEntityDispatch } = fulfillment.next();
			expect(argsWithBaseEntityDispatch).toEqual(
				dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					'argsWithBaseEntity',
					[EventEntity, 'datetime']
				)
			);
		}
	);
	it(
		'yields expected dispatch control action when modelName matches a ' +
			'modelSpecific selector (should not dispatch)',
		() => {
			const testMap = {
				getLatestCheckin: new EquivalentKeyMap(),
			};
			const test = resetStateForModel('checkin');
			test.next();
			test.next();
			const { value, done } = test.next(testMap);
			expect(value).toBeUndefined();
			expect(done).toBe(true);
		}
	);
});

describe('resetAllModelSpecific()', () => {
	const mockMap = {
		getLatestCheckin: new EquivalentKeyMap([['foo', 'bar']]),
		shouldNotAppear: new EquivalentKeyMap(),
		shouldNotCheckin: new EquivalentKeyMap(),
	};
	let fulfillment;
	const reset = (selectorName) =>
		(fulfillment = resetAllModelSpecific(selectorName));
	it('yields action for resetting all model specific state', () => {
		reset();
		const { value } = fulfillment.next();
		expect(value).toEqual({
			type: types.RESET_ALL_MODEL_SPECIFIC,
		});
	});
	it('yields select control for getting cached resolvers', () => {
		const { value } = fulfillment.next();
		expect(value).toEqual(
			select('core/data', 'getCachedResolvers', REDUCER_KEY)
		);
	});
	it('yields expected dispatch action for selectors to invalidate', () => {
		const { value } = fulfillment.next(mockMap);
		expect(value).toEqual(
			dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				'getLatestCheckin',
				'foo'
			)
		);
		const { value: final, done } = fulfillment.next();
		expect(final).toBeUndefined();
		expect(done).toBe(true);
	});
	it('yields action for resetting specific state for selector', () => {
		reset('nonValid');
		const { value } = fulfillment.next();
		expect(value).toEqual({
			type: types.RESET_MODEL_SPECIFIC_FOR_SELECTOR,
			selector: 'nonValid',
		});
	});
});

describe('resetModelSpecificForSelector()', () => {
	const fulfillment = resetModelSpecificForSelector(
		'getLatestCheckin',
		'checkin'
	);
	it(
		'yields action for resetting model specific state for the ' +
			'given selector name',
		() => {
			const { value } = fulfillment.next();
			expect(value).toEqual({
				type: types.RESET_MODEL_SPECIFIC_FOR_SELECTOR,
				selector: 'getLatestCheckin',
			});
		}
	);
});

describe('resetModelSpecificForSelectorAndArgs()', () => {
	const fulfillment = resetModelSpecificForSelectorAndArgs(
		'getLatestCheckin',
		'checkin',
		10
	);
	it(
		'yields action for resetting model specific state for the ' +
			'given selector name',
		() => {
			const { value } = fulfillment.next();
			expect(value).toEqual({
				type: types.RESET_MODEL_SPECIFIC_FOR_SELECTOR_AND_ARGS,
				selector: 'getLatestCheckin',
				args: ['checkin', 10],
			});
		}
	);
	it(
		'yields dispatch control for invalidateResolution on the ' + 'selector',
		() => {
			const { value } = fulfillment.next();
			expect(value).toEqual(
				dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					'getLatestCheckin',
					['checkin', 10]
				)
			);
		}
	);
});
