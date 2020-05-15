import { useEffect } from 'react';
import { FormApi } from 'final-form';

import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import { useDataState as useTPCDataState } from '@edtrUI/tickets/ticketPriceCalculator/data';

/**
 * A custom hook which subscribes to TAM and TPC data and updates
 * RFF data when needed.
 */
const useDataListener = ({ mutators, getState }: FormApi<any>) => {
	const { getData } = useTAMDataState();
	const data = getData();

	const id = getState().values.id || 'NEW_TICKET';
	useEffect(() => {
		// update value of `datetimes` field in RFF state
		mutators.updateFieldValue('datetimes', data?.tickets?.[id]?.datetimes);
	}, [data?.tickets]);

	const { deletedPrices, prices, ticket } = useTPCDataState();
	useEffect(() => {
		Object.entries(ticket).forEach(([key, value]) => {
			// update value of each field in RFF state
			mutators.updateFieldValue(key, value);
		});
		// duplicate prices in RFF state
		mutators.updateFieldValue('prices', prices);
		mutators.updateFieldValue('deletedPrices', deletedPrices);
	}, [prices, ticket]);
};

export default useDataListener;
