import useUpdateEntityList from './useUpdateEntityList';
import { TicketsList, useTicketQueryOptions, WriteQueryOptions } from '@edtrServices/apollo';
import { CacheUpdaterFn } from '@sharedServices/apollo/queries';

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
