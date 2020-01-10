import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_DATETIMES } from './';
import useToaster from '../../../../../application/services/toaster/useToaster';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { FetchEntitiesResult, ReadQueryOptions } from '../types';
import { DatetimesList } from '../../types';

const useFetchDatetimes = (): FetchEntitiesResult<DatetimesList> => {
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const options: ReadQueryOptions = useDatetimeQueryOptions();

	const toaster = useToaster();
	const toasterMessage = 'initializing datetimes';

	const { data, error, loading } = useQuery<DatetimesList>(GET_DATETIMES, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.datetimes, true);
			toaster.dismiss(toasterMessage);
			toaster.success(`datetimes initialized`);
		},
		onError: (error): void => {
			setIsError(TypeName.datetimes, true);
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.datetimes, loading);
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

export default useFetchDatetimes;
