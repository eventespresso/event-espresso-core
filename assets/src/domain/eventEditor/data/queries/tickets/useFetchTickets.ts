import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import useToaster from '../../../../../application/services/toaster/useToaster';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useTicketQueryOptions from './useTicketQueryOptions';
import { FetchEntitiesResult } from '../types';
import { TicketsList } from '../../types';

const useFetchTickets = (skipFetch: boolean = null): FetchEntitiesResult<TicketsList> => {
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError, isLoaded } = useStatus();
	const { query, ...options } = useTicketQueryOptions();

	const { datetimeIn } = options.variables.where;
	// do not fetch if we don't have any datetimes
	// or tickets have already been fetched
	const skip = skipFetch !== null ? skipFetch : !datetimeIn.length || isLoaded(TypeName.tickets);

	const toaster = useToaster();
	const toasterMessage = 'initializing tickets';

	const { data, error, loading } = useQuery<TicketsList>(query, {
		...options,
		skip,
		onCompleted: (): void => {
			setIsLoaded(TypeName.tickets, true);
			toaster.dismiss(toasterMessage);
			toaster.success(`tickets initialized`);
		},
		onError: (error): void => {
			setIsError(TypeName.tickets, true);
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.tickets, loading);
	}, [loading]);

	if (!initialized) {
		toaster.loading(loading, toasterMessage);
		toaster.error(error);
	}

	useEffect(() => {
		if (!initialized && !loading) {
			setInitialized(true);
		}
	}, [initialized]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchTickets;
