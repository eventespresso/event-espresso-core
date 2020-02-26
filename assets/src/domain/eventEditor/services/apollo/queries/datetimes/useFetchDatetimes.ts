import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useToaster } from '../../../../../../application/services/toaster';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { FetchEntitiesResult } from '../types';
import { DatetimesList } from '../../types';

const useFetchDatetimes = (): FetchEntitiesResult<DatetimesList> => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = useDatetimeQueryOptions();

	const toaster = useToaster();
	const loadingToastKey = useRef('dddddd' /* toaster.generateKey() */);

	const { data, error, loading } = useQuery<DatetimesList>(query, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.datetimes, true);
			toaster.dismiss(loadingToastKey.current);
			toaster.success({ message: 'datetimes initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.datetimes, true);
			toaster.dismiss(loadingToastKey.current);
			toaster.error({ message: error });
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.datetimes, loading);
		console.log('loadingToastKey', loadingToastKey.current);
		console.log('isToastOpen', toaster.isToastOpen(loadingToastKey.current));
		console.log('loading', loading);
		if (loading && !toaster.isToastOpen(loadingToastKey.current)) {
			console.log('toaster.loading');
			toaster.loading({
				key: loadingToastKey.current,
				message: 'initializing datetimes',
			});
		} else if (!loading) {
			console.log('toaster.dismiss');
			toaster.dismiss(loadingToastKey.current);
		}
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchDatetimes;
