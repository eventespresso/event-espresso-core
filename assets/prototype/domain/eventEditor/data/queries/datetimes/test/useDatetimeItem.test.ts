import { renderHook } from '@testing-library/react-hooks';

import useDatetimeItem from '../useDatetimeItem';
import { ApolloMockedProvider } from '../../../../context';
import { nodes } from './data';
import useInitDatetimeStatus from './useInitDatetimeStatus';
import useInitDatetimeTestCache from './useInitDatetimeTestCache';

describe('useDatetimeItem()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for non existent datetime when the cache is empty', () => {
		const { result } = renderHook(
			() => {
				useInitDatetimeStatus();
				return useDatetimeItem({ id: 'fake-id' });
			},
			{ wrapper }
		);

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
		const existingDatetime = nodes[0];
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
