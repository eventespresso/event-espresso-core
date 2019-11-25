import NewTicketForm from './NewTicketForm';
import FormModal from '../../shared/FormModal';
import useCreateTicketMutation from '../containers/mutations/useCreateTicketMutation';
import { GET_TICKETS } from '../containers/queries/tickets';

const AddNewTicketModal = ({ datetimes, handleClose, isOpen }) => {
	const { createTicket } = useCreateTicketMutation();

	const onSubmit = ({ name, description, price }) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				name,
				description,
				price,
			}
		};
		const optimisticResponse = {
			createTicket: {
				__typename: 'CreateTicketPayload',
				ticket: {
					__typename: 'Ticket',
					ticketId: 0,
					name,
					description,
					price,
				}
			}
		};

		const datetimeIn = datetimes && datetimes.map( ( { id } ) => id );
		const update = (
			proxy,
			{
				data: {
					createTicket: { ticket }
				}
			}
		) => {
			const options = {
				query: GET_TICKETS,
				variables: {
					where: {
						datetimeIn
					}
				}
			};
			// Read the data from our cache for this query.
			const { tickets = {}} = proxy.readQuery(options);

			// write the data to cache without
			// mutating the cache directly
			proxy.writeQuery({
				...options,
				data: {
					tickets: {
						...tickets,
						nodes: [...tickets.nodes, ticket],
					}
				}
			});
		};

		createTicket({
			variables,
			optimisticResponse,
			update
		});
	};

	return (
		<FormModal
			FormComponent={ NewTicketForm }
			initialValues={{}}
			onSubmit={onSubmit}
			onClose={handleClose}
			isOpen={isOpen}
			datetimes={ datetimes }
		/>
	);
};

export default AddNewTicketModal;
