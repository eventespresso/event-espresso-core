import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import useToaster from '../../../../../../application/services/toaster/useToaster';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { FetchEntitiesResult } from '../types';
import { DatetimesList } from '../../types';

const useFetchDatetimes = (): FetchEntitiesResult<DatetimesList> => {
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = useDatetimeQueryOptions();

	const toaster = useToaster();
	const toasterMessage = 'initializing datetimes';

	const { data, error, loading } = useQuery<DatetimesList>(query, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.datetimes, true);
			toaster.dismiss(toasterMessage);
			toaster.success({ message: 'datetimes initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.datetimes, true);
			toaster.dismiss(toasterMessage);
			toaster.error({ message: error });
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.datetimes, loading);
	}, [loading]);

	if (!initialized) {
		toaster.loading(loading, toasterMessage);
		toaster.error({ message: error });
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

export default useFetchDatetimes;
