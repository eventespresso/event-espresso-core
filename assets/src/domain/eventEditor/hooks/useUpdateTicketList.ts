import { TicketsList } from '../services/apollo/types';
import { WriteQueryOptions } from '../services/apollo/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import useTicketQueryOptions from '../services/apollo/queries/tickets/useTicketQueryOptions';
import { CacheUpdaterFn } from '../../shared/services/apollo/queries/types';

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
