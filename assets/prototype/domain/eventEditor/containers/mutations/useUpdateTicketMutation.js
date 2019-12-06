import { useMutation } from '@apollo/react-hooks';
import { UPDATE_TICKET } from './tickets';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';

const useUpdateTicketMutation = ({ id = 0 }) => {
	const toasterMessage = `updating ticket ${id}`;

	const initToaster = useInitToaster({
		toasterMessage,
		loadingMessage: toasterMessage,
		successMessage: `ticket ${id} successfully updated`
	});

	const [updateTicket, { loading, error }] = useMutation(UPDATE_TICKET, initToaster);

	initToaster.initializationNotices(loading, error);

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
