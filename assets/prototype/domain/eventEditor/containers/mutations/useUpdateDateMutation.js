import { useMutation } from '@apollo/react-hooks';
import { UPDATE_DATETIME } from './dates';

import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';

const useUpdateDateMutation = ({ id = 0 }) => {
	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `updating datetime ${id}`,
		successMessage: `datetime ${id} successfully updated`,
	});

	const [updateDate, { loading, error }] = useMutation(UPDATE_DATETIME, { onCompleted, onError });

	initializationNotices(loading, error);

	const updateHandler = (fields) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				id,
				...fields,
			},
		};

		updateDate({
			variables,
		});
	};

	return updateHandler;
};

export default useUpdateDateMutation;
