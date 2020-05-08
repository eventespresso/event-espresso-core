import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSystemNotifications } from '@appServices/toaster';
import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { useStatus, TypeName } from '@appServices/apollo/status';
import { FetchEntitiesResult } from '../types';
import { PriceTypesList } from '../../types';

const useFetchPriceTypes = (): FetchEntitiesResult<PriceTypesList> => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = usePriceTypeQueryOptions();

	const toaster = useSystemNotifications();
	const loadingToastKey = useRef('');

	const dismissLoading = (): void => toaster.dismiss(loadingToastKey.current);

	const { data, error, loading } = useQuery<PriceTypesList>(query, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.priceTypes, true);
			dismissLoading();
			toaster.success({ message: 'prices initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.priceTypes, true);
			dismissLoading();
			toaster.error({ message: error.message });
		},
	});

	useEffect(() => {
		if (loadingToastKey.current === '') {
			loadingToastKey.current = toaster.generateKey(null, `loading-${TypeName.priceTypes}`);
		}
		// if (loading) {
		toaster.loading({ loading, message: 'initializing price types', key: loadingToastKey.current });
		// }
		setIsLoading(TypeName.priceTypes, loading);
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPriceTypes;
