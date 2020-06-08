import { useEffect } from 'react';
import { useForm } from 'react-final-form';
import { pick } from 'ramda';

import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import { useDataState as useTPCDataState } from '@edtrUI/tickets/ticketPriceCalculator/data';
import { Ticket } from '@edtrServices/apollo';

// The fields that need to be synced from TPC to ticket edit form
// This is to avoid ticket.name being synced
const TPC_TICKET_FIELDS_TO_SYNC: Array<keyof Ticket> = ['isTaxable', 'price', 'reverseCalculate'];

/**
 * A custom hook which subscribes to TAM and TPC data and updates
 * RFF data when needed.
 */
const useDataListener = () => {
	const { getData } = useTAMDataState();
	const { mutators, getState } = useForm();
	const data = getData();

	const id = getState().values.id || 'NEW_TICKET';
	useEffect(() => {
		// update value of `datetimes` field in RFF state
		mutators.updateFieldValue('datetimes', data?.tickets?.[id]?.datetimes);
	}, [data?.tickets, id]);

	const { deletedPrices, prices, ticket } = useTPCDataState();
	useEffect(() => {
		const fieldsToSync = pick(TPC_TICKET_FIELDS_TO_SYNC, ticket);
		Object.entries(fieldsToSync).forEach(([key, value]) => {
			// update value of each field in RFF state
			mutators.updateFieldValue(key, value);
		});
		// duplicate prices in RFF state
		mutators.updateFieldValue('prices', prices);
		mutators.updateFieldValue('deletedPrices', deletedPrices);
	}, [prices, ticket]);
};

export default useDataListener;
