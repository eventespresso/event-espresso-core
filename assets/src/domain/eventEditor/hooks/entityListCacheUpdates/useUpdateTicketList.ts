import useUpdateEntityList from './useUpdateEntityList';
import { TicketsList, useTicketQueryOptions } from '@edtrServices/apollo';
import { CacheUpdaterFn, WriteQueryOptions } from '@dataServices/apollo/queries';

const useUpdateTicketList = (
	writeQueryOptions: WriteQueryOptions<TicketsList> = undefined
): CacheUpdaterFn<TicketsList> => {
	const queryOptions = useTicketQueryOptions();
	return useUpdateEntityList<TicketsList>({
		...queryOptions,
		...writeQueryOptions,
	});
};

export default useUpdateTicketList;
