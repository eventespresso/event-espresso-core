import React from 'react';
import { TextControl } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';

import { AttendeesEditProps } from '../types';

const AttendeeLimit: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { limit } = attributes;

	// TODO get value
	const attendeesCount = 0;
	return (
		<TextControl
			type='number'
			value={limit}
			label={__('Number of Attendees to Display:', 'event_espresso')}
			min={1}
			onChange={(limit): void => setAttributes({ limit: parseInt(limit, 10) })}
			help={sprintf(
				_n(
					'Used to adjust the number of attendees displayed (There is %d total attendee for the current filter settings).',
					'Used to adjust the number of attendees displayed (There are %d total attendees for the current filter settings).',
					attendeesCount,
					'event_espresso'
				),
				attendeesCount
			)}
		/>
	);
};

export default AttendeeLimit;
