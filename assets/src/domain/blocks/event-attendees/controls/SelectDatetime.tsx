import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import useDatetimes from '../../services/apollo/queries/useDatetimes';
import { buildEntitySelectOptions } from '@sharedServices/utils/entityList';
import { SelectControlProps } from '../../components/types';

const SelectDatetime: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { datetime, event } = attributes;

	const { data, loading, error } = useDatetimes(event);

	const list = data?.espressoDatetimes?.nodes || [];
	const options = buildEntitySelectOptions(list, loading, error);
	return (
		<SelectControl
			label={__('Select Datetime', 'event_espresso')}
			value={datetime}
			options={options as SelectControlProps['options']}
			onChange={(datetime): void => setAttributes({ datetime, ticket: '' })}
		/>
	);
};

export default SelectDatetime;
