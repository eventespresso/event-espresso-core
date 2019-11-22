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
			const {datetimes = {}} = proxy.readQuery(options);

			// write the data to cache without
			// mutating the cache directly
			proxy.writeQuery({
				...options,
				data: {
					datetimes: {
						...datetimes,
						nodes: [...datetimes.nodes, datetime],
					}
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
