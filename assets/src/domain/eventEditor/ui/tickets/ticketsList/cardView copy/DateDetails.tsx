import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import InfinitySymbol from '@application/valueObjects/InfinitySymbol';
import parseInfinity from '@appServices/utilities/parseInfinity';
import { EntityDetailsPanel } from '@appDisplay/enityDetails';
import { MutatorFn } from '@appServices/apollo/mutations';
import { Datetime } from '@edtrServices/apollo/types';
import DateRegistrationsLink from '../../DateRegistrationsLink';

interface DateDetailsProps {
	datetime: Datetime;
	updateDatetime: MutatorFn;
}

const DateDetails: React.FC<DateDetailsProps> = ({ datetime, updateDatetime }) => {
	return useMemo(() => {
		const details = [
			{
				id: 'ee-event-date-sold',
				label: __('sold'),
				value: datetime.sold || 0,
			},
			{
				id: 'ee-event-date-capacity',
				label: __('capacity'),
				value: <InfinitySymbol value={datetime.capacity} asInt />,
				onChange: (cap: any) => {
					const capacity = parseInfinity(cap, true);
					updateDatetime({ capacity });
					/**
					 * @TODO update related tickets capacity
					 */
				},
			},
			{
				id: 'ee-event-date-registrations',
				className: 'ee-has-tooltip',
				label: __('reg list'),
				value: <DateRegistrationsLink datetime={datetime} />,
			},
		];
		return <EntityDetailsPanel details={details} className='ee-editor-date-details-sold-rsrvd-cap-div' />;
	}, [datetime.capacity, datetime.sold]);
};

export default DateDetails;
