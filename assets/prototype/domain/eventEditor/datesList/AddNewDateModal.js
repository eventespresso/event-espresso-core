import NewDateForm from './NewDateForm';
import FormModal from '../FormModal';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';

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
				description,
				name,
				eventId
			}
		};

		const update = (proxy, { data: { datetime } }) => {
			// Read the data from our cache for this query.
			const data = proxy.readQuery({ query: GET_DATETIMES });
			// Write our data back to the cache with the new comment in it
			proxy.writeQuery({
				query: GET_DATETIMES,
				data: {
					...data,
					datetimes: [...data.datetimes, datetime]
				}
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
