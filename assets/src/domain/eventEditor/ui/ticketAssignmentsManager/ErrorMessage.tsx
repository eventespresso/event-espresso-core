import React from 'react';
import { __ } from '@wordpress/i18n';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import useTAMState from './useTAMState';

const { Paragraph } = Typography;

const ErrorMessage = () => {
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
	return (
		errorMessage && (
			<Paragraph type='danger'>
				<ExclamationCircleOutlined /> {errorMessage}
			</Paragraph>
		)
	);
};

export default ErrorMessage;
