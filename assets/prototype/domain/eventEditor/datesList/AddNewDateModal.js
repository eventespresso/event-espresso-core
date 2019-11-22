import NewDateForm from './NewDateForm';
import FormModal from '../FormModal';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';
import { GET_DATETIMES } from '../containers/queries/dates';

const AddNewDateModal = ({ eventId, handleClose, isOpen }) => {
	const createDate = useCreateDateMutation({ eventId });
	console.log('%c > createDate: ', 'color: HotPink;', createDate);
	const onSubmit = ({ description, name }) => {
		const variables = {
			input: { clientMutationId: 'xyz', description, name, eventId }
		};
		console.log('%c > variables: ', 'color: tomato;', variables);
		const optimisticResponse = {
			__typename: 'Mutation',
			createDatetime: {
				__typename: 'Datetime',
				datetimeId: 0,
				description,
				name,
				startDate: '',
				endDate: ''
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
			// Read the data from our cache for this query.
			const data = proxy.readQuery({
				query: GET_DATETIMES,
				variables: {
					where: {
						eventId
					}
				}
			});

			console.log({ data });

			return null;
			// Write our data back to the cache with the new comment in it
			console.log('datetime :', datetime);
			console.log('datetimes :', datetimes);
			// console.log('cachedData:', cachedData);
			const newDatatimes = {
				...datetimes,
				nodes: [...datetimes.nodes, datetime]
			};

			console.log({ newDatatimes });

			proxy.writeQuery({
				query: GET_DATETIMES,
				data: newDatatimes
			});
		};

		return createDate({
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
