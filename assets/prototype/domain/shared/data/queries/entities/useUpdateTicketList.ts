import { TicketsList } from '../../../../eventEditor/data/types';
import { WriteQueryOptions } from '../../../../eventEditor/data/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import useTicketQueryOptions from '../../../../eventEditor/data/queries/tickets/useTicketQueryOptions';
import { CacheUpdaterFn } from '../types';

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
