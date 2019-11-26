import { useMutation } from '@apollo/react-hooks';
import { DELETE_DATETIME } from './dates';
import { GET_DATETIMES } from '../queries/dates';
import { GET_TICKETS } from '../queries/tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster'

const useDeleteDatetimeMutation = ({ eventId, id }) => {
	const toaster = useToaster();
	const toasterMessage = `deleting date ${ id }`;

	const [deleteDatetime, { loading, error }] = useMutation(
		DELETE_DATETIME,
		{
			onCompleted: () => {
				toaster.dismiss( toasterMessage );
				toaster.success( `datetime ${ id } successfully deleted` );
			},
			onError: ( error ) => {
				toaster.dismiss( toasterMessage );
				toaster.error( error );
			}
		}
	);

	toaster.loading( loading, toasterMessage );
	toaster.error( error );

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

	const variables = { input: { clientMutationId: 'xyz', id } };
	return () => deleteDatetime({ variables, update });
};

export default useDeleteDatetimeMutation;
