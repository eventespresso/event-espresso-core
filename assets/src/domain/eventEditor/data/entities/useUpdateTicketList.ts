import { TicketsList } from '../types';
import { WriteQueryOptions } from '../queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import useTicketQueryOptions from '../queries/tickets/useTicketQueryOptions';
import { CacheUpdaterFn } from '../../../shared/data/queries/types';

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
