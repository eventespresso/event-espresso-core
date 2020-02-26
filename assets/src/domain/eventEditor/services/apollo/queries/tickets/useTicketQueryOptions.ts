import useDatetimeIds from '../datetimes/useDatetimeIds';
import { GET_TICKETS } from '../tickets';
import { ReadQueryOptions } from '../types';
import { EntityId } from '@appServices/apollo/types';

const useTicketQueryOptions = (datetimeIn: EntityId[] = []): ReadQueryOptions => {
	const datetimeIds = useDatetimeIds();
	const options: ReadQueryOptions = {
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn: datetimeIn.length ? datetimeIn : datetimeIds,
			},
		},
	};

	return options;
};

export default useTicketQueryOptions;
