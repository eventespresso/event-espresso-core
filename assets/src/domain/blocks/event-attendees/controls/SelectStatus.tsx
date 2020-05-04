import React from 'react';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';
import RegStatusControl from '../../components/RegStatusControl';

const SelectStatus: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { status } = attributes;

	return (
		<RegStatusControl
			label={__('Select Registration Status', 'event_espresso')}
			status={status}
			setStatus={(status): void => setAttributes({ status })}
		/>
	);
};

export default SelectStatus;
