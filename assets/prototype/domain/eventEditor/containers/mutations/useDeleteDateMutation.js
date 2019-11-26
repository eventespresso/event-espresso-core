import { useMutation } from '@apollo/react-hooks';
import { DELETE_DATETIME } from './dates';
import { GET_DATETIMES } from '../queries/dates';
import { GET_TICKETS } from '../queries/tickets';

const useDeleteDatetimeMutation = ({ eventId, id }) => {
	const [deleteDatetime, { loading, error }] = useMutation(DELETE_DATETIME);
	const variables = { input: { clientMutationId: 'xyz', id } };

	const update = (
		proxy,
		{
			data: {
				deleteDatetime: { datetime }
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

		const { datetimes = {} } = proxy.readQuery(options);

		//TODO - improve readability.
		const nodes = datetimes.nodes.filter(({ id }) => id !== datetime.id);
		const data = {
			datetimes: {
				...datetimes,
				nodes
			}
		};

		if (datetime.id) {
			const ticketsData = proxy.readQuery({
				query: GET_TICKETS,
				variables: {
					where: {
						datetimeIn: datetimes.nodes.map(({ id }) => id)
					}
				}
			});

			proxy.writeQuery({
				query: GET_TICKETS,
				data: ticketsData,
				variables: {
					where: {
						datetimeIn: nodes.map(({ id }) => id)
					}
				}
			});
		}

		proxy.writeQuery({
			...options,
			data
		});
	};

	const deleteHandler = () => deleteDatetime({ variables, update });

	console.log('loading: ', loading);
	console.log('error: ', error);

	return deleteHandler;
};

export default useDeleteDatetimeMutation;
