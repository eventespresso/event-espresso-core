import useDatetimeIds from '../datetimes/useDatetimeIds';
import { GET_TICKETS } from './';
import { ReadQueryOptions } from '../types';

const useTicketQueryOptions = (): ReadQueryOptions => {
	const datetimeIn: string[] = useDatetimeIds();
	const options: ReadQueryOptions = {
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
