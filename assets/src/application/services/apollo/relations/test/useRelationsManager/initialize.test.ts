import { renderHook, act } from '@testing-library/react-hooks';
import { pick } from 'ramda';

import { relationalData } from '../../../../../../domain/eventEditor/services/context/TestContext/data';
import useRelationsManager from '../../useRelationsManager';

describe('RelationsManager.initialize', () => {
	it('returns the relational state set via initialize when initial state is NOT passed', () => {
		const { result } = renderHook(() => useRelationsManager());

		let relationalState = result.current.getData();

		// before `initialize`
		expect(relationalState).toEqual({});

		act(() => {
			result.current.initialize(relationalData);
		});

		relationalState = result.current.getData();

		// after `initialize`
		expect(relationalState).toEqual(relationalData);
	});

	it('returns the relational state set via initialize when an initial state IS passed', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		let relationalState = result.current.getData();

		// before `initialize`
		expect(relationalState).toEqual(relationalData);

		const differentInitialState = pick(['datetimes', 'tickets'], relationalData);
		act(() => {
			result.current.initialize(differentInitialState);
		});

		relationalState = result.current.getData();

		// after `initialize`
		expect(relationalState).toEqual(differentInitialState);
		expect(relationalState).not.toBe(relationalData);
	});
});
