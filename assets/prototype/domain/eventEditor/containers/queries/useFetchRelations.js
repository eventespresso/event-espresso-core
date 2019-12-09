import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_RELATIONS_DATA } from './relations';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';
import useEventId from './useEventId';

const useFetchRelations = ({ onReceiveRelations }) => {
	console.log('%c useFetchRelations: ', 'color: deeppink; font-size: 14px;');
	const [initialized, setInitialized] = useState(false);

	const eventId = useEventId();

	const toaster = useToaster();
	const initializingMessage = 'initializing event editor relations';

	const { data, error, loading } = useQuery(GET_RELATIONS_DATA, {
		variables: { eventId },
		onCompleted: (r_data) => {
			if (typeof onReceiveRelations === 'function') {
				onReceiveRelations(r_data);
			}
			toaster.dismiss(initializingMessage);
			toaster.success(`event editor relations initialized`);
		},
		onError: (error) => {
			toaster.dismiss(initializingMessage);
			toaster.error(error);
		},
	});

	if (!initialized) {
		toaster.loading(loading, initializingMessage);
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

export default useFetchRelations;
