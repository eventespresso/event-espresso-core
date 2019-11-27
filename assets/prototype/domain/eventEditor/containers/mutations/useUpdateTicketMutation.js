import { useMutation } from '@apollo/react-hooks';
import { UPDATE_TICKET } from './tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useUpdateTicketMutation = ({ id = 0 }) => {
	const toaster = useToaster();
	const toasterMessage = `updating ticket ${id}`;
	const [updateTicket, { loading, error }] = useMutation(UPDATE_TICKET, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`ticket ${id} successfully updated`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	toaster.loading(loading, toasterMessage);
	toaster.error(error);

	const getVariables = ({ description, name, price }) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				id,
				// There is room for readability improvement here
				...(description && { description }),
				...(name && { name }),
				...(price && { price }),
			},
		};

		return variables;
	};

	const updateHandler = ({ description, name, price }) => {
		const variables = getVariables({ description, name, price });

		updateTicket({
			variables,
		});
	};

	return updateHandler;
};

export default useUpdateTicketMutation;
