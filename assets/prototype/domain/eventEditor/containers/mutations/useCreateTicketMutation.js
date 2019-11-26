import { useMutation } from '@apollo/react-hooks';
import { CREATE_TICKET } from './tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster'

const useCreateTicketMutation = () => {
	const toaster = useToaster();
	const id = 0;
	const toasterMessage = `creating new ticket for datetime ${ id }`;
	const [createTicket, { loading, error }] = useMutation(
		CREATE_TICKET,
		{
			onCompleted: () => {
				toaster.dismiss( toasterMessage );
				toaster.success( 'ticket successfully created' );
			},
			onError: ( error ) => {
				toaster.dismiss( toasterMessage );
				toaster.error( error );
			}
		}
	);
	toaster.loading( loading, toasterMessage );
	toaster.error( error );

	return {
		createTicket,
		loading,
		error
	};
};

export default useCreateTicketMutation;
