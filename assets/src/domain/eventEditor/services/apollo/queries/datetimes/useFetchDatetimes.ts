import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { __ } from '@wordpress/i18n';

import { useSystemNotifications } from '@appServices/toaster';
import { useStatus, TypeName } from '@appServices/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { FetchEntitiesResult } from '../types';
import { DatetimesList } from '../../types';

const useFetchDatetimes = (): FetchEntitiesResult<DatetimesList> => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = useDatetimeQueryOptions();

	const toaster = useSystemNotifications();
	const toastId = useRef(null);

	const dismissLoading = (): void => toaster.dismiss(toastId.current);

	const { data, error, loading } = useQuery<DatetimesList>(query, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.datetimes, true);
			setIsLoading(TypeName.datetimes, false);
			dismissLoading();
			toastId.current = toaster.success({ message: __('datetimes initialized') });
		},
		onError: (error): void => {
			setIsError(TypeName.datetimes, true);
			setIsLoading(TypeName.datetimes, false);
			dismissLoading();
			toaster.error({ message: error.message });
		},
	});

	useEffect(() => {
		if (loading) {
			toastId.current = toaster.loading({ message: __('initializing datetimes') });
		}

		setIsLoading(TypeName.datetimes, loading);
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchDatetimes;
