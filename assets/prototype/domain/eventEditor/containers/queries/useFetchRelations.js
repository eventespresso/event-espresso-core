import { useQuery } from '@apollo/react-hooks';
import { GET_RELATIONS_DATA } from './relations';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useFetchRelations = ({ eventId, onReceiveRelations }) => {
	console.log('%c useFetchRelations: ', 'color: deeppink; font-size: 14px;');

	const toaster = useToaster();
	const toasterDatesMessage = 'initializing event editor relations';

	const { data, error, loading } = useQuery(GET_RELATIONS_DATA, {
		variables: { eventId },
		onCompleted: (r_data) => {
			if (onReceiveRelations) {
				onReceiveRelations(r_data);
			}
			toaster.dismiss(toasterDatesMessage);
			toaster.success(`event editor relations initialized`);
		},
		onError: (error) => {
			toaster.dismiss(toasterDatesMessage);
			toaster.error(error);
		},
	});

	return {
		data,
		error,
		loading,
	};
};

export default useFetchRelations;
