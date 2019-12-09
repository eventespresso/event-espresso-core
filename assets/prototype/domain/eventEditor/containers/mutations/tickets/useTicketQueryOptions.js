import useDatetimeIds from '../../queries/useDatetimeIds';
import { queries } from '../../queries';

const { GET_TICKETS } = queries;

const useTicketQueryOptions = () => {
	const datetimeIn = useDatetimeIds();
	const options = {
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn,
			},
		},
	};

	return options;
};

export default useTicketQueryOptions;
