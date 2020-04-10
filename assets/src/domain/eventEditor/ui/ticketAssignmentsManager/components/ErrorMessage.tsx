import React from 'react';
import { __ } from '@wordpress/i18n';
import { EspressoAlert } from '@application/ui/display';

import { useDataState } from '../data';

interface ErrorMessageProps {
	asAlert?: boolean;
	dataState: ReturnType<typeof useDataState>;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ asAlert = true, dataState }) => {
	const { hasOrphanDates, hasOrphanTickets } = dataState;

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

	if (asAlert) {
		return <EspressoAlert description={errorMessage} status='error' title={__('Error')} />;
	}

	return errorMessage;
};

export default ErrorMessage;
