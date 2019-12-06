import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_RELATIONS_DATA } from './relations';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';
import useEventId from './useEventId';

const useFetchRelations = ({ onReceiveRelations }) => {
	console.log('%c useFetchRelations: ', 'color: deeppink; font-size: 14px;');

	const eventId = useEventId();

	const initializingMessage = 'initializing event editor relations';

	const initToaster = useInitToaster({
		toasterMessage: initializingMessage,
		loadingMessage: initializingMessage,
		successMessage: 'event editor relations initialized'
	});

	const { data, error, loading } = useQuery(GET_RELATIONS_DATA, {
		variables: { eventId },
		...initToaster,
	});

	initToaster.initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchRelations;
