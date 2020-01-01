import { renderHook, act } from '@testing-library/react-hooks';
import { pick } from 'ramda';

import { relationalData } from '../../../../../domain/eventEditor/context';
import useRelationsManager from '../useRelationsManager';

describe('RelationsManager.setData()', () => {
	it('returns the relational state set via setData when initial state is NOT passed', () => {
		const { result } = renderHook(() => useRelationsManager());

		let relationalState = result.current.getData();

		// before `setData`
		expect(relationalState).toEqual({});

		act(() => {
			result.current.setData(relationalData);
		});

		relationalState = result.current.getData();

		// after `setData`
		expect(relationalState).toEqual(relationalData);
	});

	it('returns the relational state set via setData when an initial state IS passed', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		let relationalState = result.current.getData();

		// before `setData`
		expect(relationalState).toEqual(relationalData);

		const differentInitialState = pick(['datetimes', 'tickets'], relationalData);
		act(() => {
			result.current.setData(differentInitialState);
		});

		relationalState = result.current.getData();

		// after `setData`
		expect(relationalState).toEqual(differentInitialState);
		expect(relationalState).not.toBe(relationalData);
	});
});
