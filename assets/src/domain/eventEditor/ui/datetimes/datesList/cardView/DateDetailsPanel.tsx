import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityDetailsPanel } from '@application/ui/display/entityDetailsPanel';
import DateRegistrationsLink from '../../DateRegistrationsLink';
import DateCapacity from './DateCapacity';
import { getPropsAreEqual } from '@appServices/utilities';
import type { DateItemProps } from '../types';

const DateDetailsPanel: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const details = [
		{
			id: 'ee-event-date-sold',
			label: __('sold'),
			value: datetime.sold || 0,
		},
		{
			id: 'ee-event-date-capacity',
			label: __('capacity'),
			value: <DateCapacity entity={datetime} />,
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

export default React.memo(DateDetailsPanel, getPropsAreEqual(['entity', 'cacheId']));
