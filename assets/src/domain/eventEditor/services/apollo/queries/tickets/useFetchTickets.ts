import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import useToaster from '../../../../../../application/services/toaster/useToaster';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import useTicketQueryOptions from './useTicketQueryOptions';
import { FetchEntitiesResult } from '../types';
import { TicketsList } from '../../types';

const useFetchTickets = (skipFetch: boolean = null): FetchEntitiesResult<TicketsList> => {
	const { setIsLoading, setIsLoaded, setIsError, isLoaded } = useStatus();
	const { query, ...options } = useTicketQueryOptions();

	const { datetimeIn } = options.variables.where;
	// do not fetch if we don't have any datetimes
	// or tickets have already been fetched
	const skip = skipFetch !== null ? skipFetch : !datetimeIn.length || isLoaded(TypeName.tickets);

	const toaster = useToaster();
	const loadingToastKey = useRef(toaster.generateKey());

	const { data, error, loading } = useQuery<TicketsList>(query, {
		...options,
		skip,
		onCompleted: (): void => {
			setIsLoaded(TypeName.tickets, true);
			toaster.dismiss(loadingToastKey.current);
			toaster.success({ message: `tickets initialized` });
		},
		onError: (error): void => {
			setIsError(TypeName.tickets, true);
			toaster.dismiss(loadingToastKey.current);
			toaster.error({ message: error });
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.tickets, loading);

		if (loading && !toaster.isToastOpen(loadingToastKey.current)) {
			toaster.loading({
				key: loadingToastKey.current,
				message: 'initializing tickets',
			});
		} else if (!loading) {
			toaster.dismiss(loadingToastKey.current);
		}
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchTickets;
