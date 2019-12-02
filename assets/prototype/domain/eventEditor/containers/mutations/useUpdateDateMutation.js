import { useMutation } from '@apollo/react-hooks';
import { UPDATE_DATE } from './dates';

import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useUpdateDateMutation = ({ id = 0 }) => {
	const toaster = useToaster();
	const toasterMessage = `updating datetime ${id}`;
	const [updateDate, { loading, error }] = useMutation(UPDATE_DATE, {
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

	const getVariables = ({ endDate, description, name, startDate }) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				id,
				...(endDate && { endDate }),
				...(description && { description }),
				...(name && { name }),
				...(startDate && { startDate }),
			},
		};

		return variables;
	};

	const updateHandler = ({ endDate, description, name, startDate }) => {
		const variables = getVariables({ endDate, description, name, startDate });

		updateDate({
			variables,
		});
	};

	return updateHandler;
};

export default useUpdateDateMutation;
