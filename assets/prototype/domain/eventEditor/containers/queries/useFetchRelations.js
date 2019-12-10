import { useQuery } from '@apollo/react-hooks';
import { GET_RELATIONS_DATA } from './relations';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';
import useEventId from './useEventId';

const useFetchRelations = ({ onReceiveRelations }) => {
	console.log('%c useFetchRelations: ', 'color: deeppink; font-size: 14px;');

	const eventId = useEventId();

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: 'initializing event editor relations',
		successMessage: 'event editor relations initialized',
	});

	const { data, error, loading } = useQuery(GET_RELATIONS_DATA, {
		variables: { eventId },
		onCompleted: (r_data) => {
			if (typeof onReceiveRelations === 'function') {
				onReceiveRelations(r_data);
			}
			onCompleted();
		},
		onError,
	});

	initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchRelations;
