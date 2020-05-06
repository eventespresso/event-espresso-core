import { identity, sortBy } from 'ramda';

import useDatetimeIds from '../datetimes/useDatetimeIds';
import { GET_TICKETS } from '../tickets';
import { ReadQueryOptions } from '../types';
import { EntityId } from '@dataServices/types';

const useTicketQueryOptions = (datetimeIn: EntityId[] = []): ReadQueryOptions => {
	const datetimeIds = useDatetimeIds();

	let newDatetimeIn = datetimeIn.length ? datetimeIn : datetimeIds;

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access Apollo Cache
	newDatetimeIn = sortBy(identity, newDatetimeIn);

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
