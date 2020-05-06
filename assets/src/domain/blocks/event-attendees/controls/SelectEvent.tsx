import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import useEvents from '../../services/apollo/queries/useEvents';
import { buildEntitySelectOptions } from '@sharedServices/utils/entityList';
import { SelectControlProps } from '../../components/types';

const SelectEvent: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { event } = attributes;

	const { data, loading, error } = useEvents();

	const list = data?.espressoEvents?.nodes || [];
	const options = buildEntitySelectOptions(list, loading, error);

	return (
		<SelectControl
			label={__('Select Event', 'event_espresso')}
			value={event}
			options={options as SelectControlProps['options']}
			onChange={(event): void => setAttributes({ event, datetime: '', ticket: '' })}
		/>
	);
};

export default SelectEvent;
