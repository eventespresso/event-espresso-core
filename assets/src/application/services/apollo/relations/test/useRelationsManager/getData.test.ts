import { renderHook, act } from '@testing-library/react-hooks';

import { relationalData } from '../../../../../../domain/eventEditor/services/context/TestContext/data';
import useRelationsManager from '../../useRelationsManager';

describe('RelationsManager.getData()', () => {
	it('returns the initial relational state (empty object)', () => {
		const { result } = renderHook(() => useRelationsManager());

		const { current: relationsManager } = result;

		const relationalState = relationsManager.getData();

		expect(relationalState).toEqual({});
	});

	it('returns the relational state passed to the hook', () => {
		const { result } = renderHook(() => useRelationsManager(relationalData));

		const { current: relationsManager } = result;

		const relationalState = relationsManager.getData();

		expect(relationalState).toEqual(relationalData);
	});

	it('returns the relational state set via initialize', () => {
		const { result } = renderHook(() => useRelationsManager());

		act(() => {
			result.current.initialize(relationalData);
		});

		const relationalState = result.current.getData();

		expect(relationalState).toEqual(relationalData);
	});
});
