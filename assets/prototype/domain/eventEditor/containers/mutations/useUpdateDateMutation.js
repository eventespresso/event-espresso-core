import { useMutation } from '@apollo/react-hooks';
import { UPDATE_DATETIME } from './dates';

import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useUpdateDateMutation = ({ id = 0 }) => {
	const toaster = useToaster();
	const toasterMessage = `updating datetime ${id}`;
	const [updateDate, { loading, error }] = useMutation(UPDATE_DATETIME, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`datetime ${id} successfully updated`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	toaster.loading(loading, toasterMessage);
	toaster.error(error);

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
