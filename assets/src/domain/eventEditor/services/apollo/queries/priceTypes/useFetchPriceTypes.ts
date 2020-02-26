import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useToaster, useLoadingToast } from '../../../../../../application/services/toaster';
import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import { FetchEntitiesResult } from '../types';
import { PriceTypesList } from '../../types';

const useFetchPriceTypes = (): FetchEntitiesResult<PriceTypesList> => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = usePriceTypeQueryOptions();

	const toaster = useToaster();
	const loadingToastKey = useRef(toaster.generateKey());

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
			toaster.error({ message: error });
		},
	});

	useLoadingToast({ loading, message: 'initializing price types', toastKey: loadingToastKey.current });

	useEffect(() => {
		setIsLoading(TypeName.priceTypes, loading);
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPriceTypes;
