import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_TICKETS } from './';
import useToaster from '../../../../../application/services/toaster/useToaster';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useTicketQueryOptions from './useTicketQueryOptions';
import useDatetimeIds from '../datetimes/useDatetimeIds';
import { FetchEntitiesResult, ReadQueryOptions } from '../types';
import { EntityId } from '../../types';
import { TicketsList } from '../../types';

const useFetchTickets = (): FetchEntitiesResult => {
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const options: ReadQueryOptions = useTicketQueryOptions();
	const datetimeIn: EntityId[] = useDatetimeIds();

	const toaster = useToaster();
	const toasterMessage = 'initializing tickets';

	const { data, error, loading } = useQuery<TicketsList>(GET_TICKETS, {
		...options,
		skip: !datetimeIn.length, // do not fetch if we don't have any datetimes
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
