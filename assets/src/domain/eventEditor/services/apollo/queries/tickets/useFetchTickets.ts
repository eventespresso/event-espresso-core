import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSystemNotifications } from '@appServices/toaster';
import { useStatus, TypeName } from '@appServices/apollo/status';
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

	const toaster = useSystemNotifications();
	const toastId = useRef(null);

	const dismissLoading = (): void => toaster.dismiss(toastId.current);

	const { data, error, loading } = useQuery<TicketsList>(query, {
		...options,
		skip,
		onCompleted: (): void => {
			setIsLoaded(TypeName.tickets, true);
			dismissLoading();
			toaster.success({ message: 'tickets initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.tickets, true);
			dismissLoading();
			toaster.error({ message: error.message });
		},
	});

	useEffect(() => {
		if (loading) {
			toastId.current = toaster.loading({ message: 'initializing tickets' });
		}

		setIsLoading(TypeName.tickets, loading);
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchTickets;
