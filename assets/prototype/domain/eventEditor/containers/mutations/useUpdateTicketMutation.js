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

	const updateHandler = ({ description, name, price, prices }) => {
		// it's supposed that only those variables should be passed
		// which are to be updated.
		const variables = {
			clientMutationId: 'xyz',
			id,
			description,
			name,
			price,
			prices,
		};

		updateTicket({
			variables,
		});
	};

	return updateHandler;
};

export default useUpdateTicketMutation;
