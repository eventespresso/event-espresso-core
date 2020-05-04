import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import useTickets from '../hooks/useTickets';
import { buildEntitySelectOptions } from '@sharedServices/utils/entityList';
import { SelectControlProps } from '../../components/types';

const SelectTicket: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { datetime, ticket } = attributes;
	const { data, loading, error } = useTickets(datetime);

	const options = buildEntitySelectOptions(data?.espressoTickets?.nodes || [], loading, error);

	return (
		<SelectControl
			label={__('Select Ticket', 'event_espresso')}
			value={ticket}
			options={options as SelectControlProps['options']}
			onChange={(ticket): void => setAttributes({ ticket })}
		/>
	);
};

export default SelectTicket;
