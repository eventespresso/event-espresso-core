import useDatetimeIds from '../datetimes/useDatetimeIds';
import { GET_TICKETS } from './';

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
