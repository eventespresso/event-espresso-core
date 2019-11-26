import { useMutation } from '@apollo/react-hooks';
import { CREATE_DATE } from './dates';
import { GET_DATETIMES } from '../queries/dates';
import { GET_TICKETS } from '../queries/tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useCreateDateMutation = ({ eventId }) => {
	const toaster = useToaster();
	const toasterMessage = `creating new datetime for event ${eventId}`;
	const [createDate, { loading, error }] = useMutation(CREATE_DATE, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success('datetime successfully created');
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		}
	});
	toaster.loading(loading, toasterMessage);
	toaster.error(error);

	// On submit handler receives data from FormModal
	return ({ description, name }) => {
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

			if (datetime.id) {
				const datetimeIn = datetimes.nodes.map(({ id }) => id);
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
							datetimeIn: [...datetimeIn, datetime.id]
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
};

export default useCreateDateMutation;
