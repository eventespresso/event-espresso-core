import { renderHook } from '@testing-library/react-hooks';

import useDatetimeQueryOptions from '../useDatetimeQueryOptions';
import { ApolloMockedProvider } from '../../../../context/ContextProviders';
import { setup, cleanup, eventId } from './data';

beforeEach(setup);

afterEach(cleanup);

describe('useDatetimeQueryOptions()', () => {
	it('checks if the eventId for query is correct', () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(() => useDatetimeQueryOptions(), { wrapper });

		expect(result.current.variables.where.eventId).toEqual(eventId);
	});
});
