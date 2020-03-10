import { renderHook, cleanup } from '@testing-library/react-hooks';

import useDatetimeItem from '../useDatetimeItem';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitDatetimeTestCache from './useInitDatetimeTestCache';

afterEach(() => {
	cleanup();
});

describe('useDatetimeItem', () => {
	const wrapper = ApolloMockedProvider();
	const existingDatetime = nodes[0];
	it('checks for non existent datetime when the cache is empty', () => {
		const { result, waitForValueToChange } = renderHook(() => useDatetimeItem({ id: existingDatetime.id }), {
			wrapper,
		});
		waitForValueToChange(() => result.current);

		expect(result.current).toBe(undefined);
	});

	it('checks for non existent datetime when the cache is NOT empty', () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useDatetimeItem({ id: 'fake-id' });
			},
			{ wrapper }
		);
		waitForValueToChange(() => result.current);

		expect(result.current).toBe(undefined);
	});

	it('checks for an existent datetime', () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useDatetimeItem({ id: existingDatetime.id });
			},
			{ wrapper }
		);
		waitForValueToChange(() => result.current);

		const datetimeItem = result.current;

		expect(datetimeItem).toBeDefined();

		expect(datetimeItem.id).toEqual(existingDatetime.id);

		expect(datetimeItem.dbId).toEqual(existingDatetime.dbId);

		expect(datetimeItem).toEqual(existingDatetime);
	});
});
