import NewDateForm from './NewDateForm';
import FormModal from '../../shared/FormModal';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';
import { GET_DATETIMES } from '../containers/queries/dates';
import { GET_TICKETS } from '../containers/queries/tickets';

const AddNewDateModal = ({ eventId, handleClose, isOpen }) => {
	const { createDate } = useCreateDateMutation();

	const onSubmit = ({ description, name }) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				description,
				eventId,
				name
			}
		};
		const optimisticResponse = {
			createDatetime: {
				__typename: 'CreateDatetimePayload',
				datetime: {
					__typename: 'Datetime',
					datetimeId: 0,
					name,
					description,
					endDate: '',
					startDate: ''
				}
			}
		};

		const update = (
			proxy,
			{
				data: {
					createDatetime: { datetime }
				}
			}
		) => {

			const options = {
				query: GET_DATETIMES,
				variables: {
					where: {
						eventId
					}
				}
			};
			// Read the data from our cache for this query.
			const { datetimes = {} } = proxy.readQuery(options);

			if ( datetime.id ) {
				const datetimeIn = datetimes.nodes.map(({id}) => id);
				// Read the data from our cache for this query.
				const data = proxy.readQuery({
					query: GET_TICKETS,
					variables: {
						where: {
							datetimeIn
						}
					}
				});

				// write the data to cache without
				// mutating the cache directly
				proxy.writeQuery({
					query: GET_TICKETS,
					data,
					variables: {
						where: {
							datetimeIn: [...datetimeIn, datetime.id],
						}
					}
				});
			}

			// write the data to cache without
			// mutating the cache directly
			proxy.writeQuery({
				...options,
				data: {
					datetimes: {
						...datetimes,
						nodes: [...datetimes.nodes, datetime]
					}
				}
			});
		};

		createDate({
			variables,
			optimisticResponse,
			update
		});
	};

	return (
		<FormModal
			FormComponent={NewDateForm}
			initialValues={{}}
			onSubmit={onSubmit}
			onClose={handleClose}
			isOpen={isOpen}
		/>
	);
};

export default AddNewDateModal;
