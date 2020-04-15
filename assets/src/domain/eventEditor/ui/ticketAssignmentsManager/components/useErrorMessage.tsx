import { __ } from '@wordpress/i18n';

import { useDataState } from '../data';

const useErrorMessage = () => {
	const { hasOrphanDates, hasOrphanTickets } = useDataState();

	let errorMessage = null;

	if (hasOrphanTickets()) {
		errorMessage = __(
			'Tickets must always have at least one date assigned to them but one or more of the tickets below does not have any. Please correct the assignments for the highlighted cells.'
		);
	} else if (hasOrphanDates()) {
		errorMessage = __(
			'Event Dates must always have at least one Ticket assigned to them but one or more of the Event Dates below does not have any. Please correct the assignments for the highlighted cells.'
		);
	}

	if (!errorMessage) {
		return null;
	}

	return errorMessage;
};

export default useErrorMessage;
