import { renderHook } from '@testing-library/react-hooks';

import useDatetimeItem from '../useDatetimeItem';
import { ApolloMockedProvider } from '../../../../context';
import { nodes } from './data';
import useInitDatetimeTestCache from './useInitDatetimeTestCache';

describe('useDatetimeItem()', () => {
	const wrapper = ApolloMockedProvider();
	const existingDatetime = nodes[0];
	it('checks for non existent datetime when the cache is empty', () => {
		const { result } = renderHook(() => useDatetimeItem({ id: existingDatetime.id }), { wrapper });

		expect(result.current).toBeUndefined();
	});

	it('checks for non existent datetime when the cache is NOT empty', () => {
		const { result } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useDatetimeItem({ id: 'fake-id' });
			},
			{ wrapper }
		);

		expect(result.current).toBeUndefined();
	});

	it('checks for an existent datetime', () => {
		const { result } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useDatetimeItem({ id: existingDatetime.id });
			},
			{ wrapper }
		);

		const { current: datetimeItem } = result;

		expect(datetimeItem).toBeDefined();

		expect(datetimeItem.id).toEqual(existingDatetime.id);

		expect(datetimeItem.dbId).toEqual(existingDatetime.dbId);

		expect(datetimeItem).toEqual(existingDatetime);
	});
});
