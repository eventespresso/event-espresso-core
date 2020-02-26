import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useToaster, useLoadingToast } from '../../../../../../application/services/toaster';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { FetchEntitiesResult } from '../types';
import { DatetimesList } from '../../types';

const useFetchDatetimes = (): FetchEntitiesResult<DatetimesList> => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = useDatetimeQueryOptions();

	const toaster = useToaster();
	const loadingToastKey = useRef(toaster.generateKey());

	const dismissLoading = (): void => toaster.dismiss(loadingToastKey.current);

	const { data, error, loading } = useQuery<DatetimesList>(query, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.datetimes, true);
			dismissLoading();
			toaster.success({ message: 'datetimes initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.datetimes, true);
			dismissLoading();
			toaster.error({ message: error.message });
		},
	});

	useLoadingToast({ loading, message: 'initializing datetimes', toastKey: loadingToastKey.current });

	useEffect(() => {
		setIsLoading(TypeName.datetimes, loading);
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchDatetimes;
