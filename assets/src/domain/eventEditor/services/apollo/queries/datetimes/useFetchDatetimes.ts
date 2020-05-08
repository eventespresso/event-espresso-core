import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSystemNotifications } from '@appServices/toaster';
import { useStatus, TypeName } from '@appServices/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { FetchEntitiesResult } from '../types';
import { DatetimesList } from '../../types';

const useFetchDatetimes = (): FetchEntitiesResult<DatetimesList> => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = useDatetimeQueryOptions();

	const toaster = useSystemNotifications();
	const loadingToastKey = useRef('');

	const dismissLoading = (): void => toaster.dismiss(loadingToastKey.current);

	const { data, error, loading } = useQuery<DatetimesList>(query, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.datetimes, true);
			setIsLoading(TypeName.datetimes, false);
			dismissLoading();
			toaster.success({ message: 'datetimes initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.datetimes, true);
			setIsLoading(TypeName.datetimes, false);
			dismissLoading();
			toaster.error({ message: error.message });
		},
	});

	useEffect(() => {
		if (loadingToastKey.current === '') {
			loadingToastKey.current = toaster.generateKey(null, `loading-${TypeName.datetimes}`);
		}
		// if (loading) {
		toaster.loading({ loading, message: 'initializing datetimes', key: loadingToastKey.current });
		// }
		setIsLoading(TypeName.datetimes, loading);
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchDatetimes;
