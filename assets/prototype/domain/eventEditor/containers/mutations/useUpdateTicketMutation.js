import { useMutation } from '@apollo/react-hooks';
import { UPDATE_TICKET } from './tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useUpdateTicketMutation = () => {
	const toaster = useToaster();
	const id = 0;
	const toasterMessage = `updating ticket ${id}`;
	const [updateTicket, { loading, error }] = useMutation(UPDATE_TICKET, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`ticket ${id} successfully updated`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		}
	});

	toaster.loading(loading, toasterMessage);
	toaster.error(error);

	return { updateTicket, loading, error };
};

export default useUpdateTicketMutation;
