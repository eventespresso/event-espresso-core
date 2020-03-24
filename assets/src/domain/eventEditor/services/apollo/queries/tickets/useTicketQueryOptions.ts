import useDatetimeIds from '../datetimes/useDatetimeIds';
import { GET_TICKETS } from '../tickets';
import { ReadQueryOptions } from '../types';
import { EntityId } from '@appServices/apollo/types';

const useTicketQueryOptions = (datetimeIn: EntityId[] = []): ReadQueryOptions => {
	const datetimeIds = useDatetimeIds();

	const newDatetimeIn = datetimeIn.length ? datetimeIn : datetimeIds;

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access apollo cache
	newDatetimeIn.sort();

	const options: ReadQueryOptions = {
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn: newDatetimeIn,
			},
		},
	};

	return options;
};

export default useTicketQueryOptions;
