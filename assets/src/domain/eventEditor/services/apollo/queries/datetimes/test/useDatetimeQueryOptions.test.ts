import { renderHook } from '@testing-library/react-hooks';

import useDatetimeQueryOptions from '../useDatetimeQueryOptions';
import { ApolloMockedProvider, eventId } from '../../../../../services/context/TestContext';

describe('useDatetimeQueryOptions()', () => {
	it('checks if the query operation variables are correct', () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(() => useDatetimeQueryOptions(), { wrapper });

		expect(result.current.variables.where.eventId).toEqual(eventId);
	});
});
