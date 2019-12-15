import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_DATETIMES } from './';
import useToaster from '../../../../../application/services/toaster/useToaster';
import useStatus from '../../../../../application/services/apollo/status/useStatus';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';

const useFetchDatetimes = () => {
	console.log('%c useFetchDatetimes: ', 'color: deeppink; font-size: 14px;');
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const options = useDatetimeQueryOptions();

	const toaster = useToaster();
	const toasterMessage = 'initializing datetimes';

	const { data, error, loading } = useQuery(GET_DATETIMES, {
		...options,
		onCompleted: () => {
			setIsLoaded('datetimes', true);
			toaster.dismiss(toasterMessage);
			toaster.success(`datetimes initialized`);
		},
		onError: (error) => {
			setIsError('datetimes', true);
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	useEffect(() => {
		setIsLoading('datetimes', loading);
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
