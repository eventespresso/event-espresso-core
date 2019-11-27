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

	const updateHandler = ({ description, name, price }) => {
		if (description) {
			return updateTicket({
				variables: { input: { clientMutationId: 'xyz', id, description } },
			});
		}

		if (name) {
			return updateTicket({
				variables: { input: { clientMutationId: 'xyz', id, name } },
			});
		}

		if (price) {
			return updateTicket({
				variables: { input: { clientMutationId: 'xyz', id, price } },
			});
		}

		return null;
	};

	return updateHandler;
};

export default useUpdateTicketMutation;
