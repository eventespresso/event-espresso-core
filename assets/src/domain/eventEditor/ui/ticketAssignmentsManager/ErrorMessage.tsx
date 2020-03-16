import React from 'react';
import { __ } from '@wordpress/i18n';
import { Alert } from 'antd';

import useTAMState from './useTAMState';

interface ErrorMessageProps {
	asAlert?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ asAlert = true }) => {
	const { hasOrphanDates, hasOrphanTickets } = useTAMState();

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
		return <Alert message={__('Error')} description={errorMessage} type='error' showIcon />;
	}

	return errorMessage;
};

export default ErrorMessage;
