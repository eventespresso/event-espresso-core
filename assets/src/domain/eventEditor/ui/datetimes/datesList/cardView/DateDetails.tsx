import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityDetailsPanel } from '@appDisplay/enityDetails';
import { Datetime } from '@edtrServices/apollo/types';
import DateRegistrationsLink from '../../DateRegistrationsLink';
import DateCapacity from './DateCapacity';

interface DateDetailsProps {
	datetime: Datetime;
}

const DateDetails: React.FC<DateDetailsProps> = ({ datetime }) => {
	const details = [
		{
			id: 'ee-event-date-sold',
			label: __('sold'),
			value: datetime.sold || 0,
		},
		{
			id: 'ee-event-date-capacity',
			label: __('capacity'),
			value: <DateCapacity datetime={datetime} />,
		},
		{
			id: 'ee-event-date-registrations',
			className: 'ee-has-tooltip',
			label: __('reg list'),
			value: <DateRegistrationsLink datetime={datetime} />,
		},
	];

	return <EntityDetailsPanel details={details} className='ee-editor-date-details-sold-rsrvd-cap-div' />;
};

export default DateDetails;
