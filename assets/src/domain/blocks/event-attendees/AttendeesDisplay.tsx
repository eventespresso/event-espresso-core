import React from 'react';
import { Placeholder, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { AttendeesEditProps } from './types';
import useAttendees from './hooks/useAttendees';
import AttendeesList from './AttendeesList';
import { CSS_CLASS_CORE_BLOCKS } from '../constants';

const isNewBlock = ({ event, datetime, ticket }: AttendeesEditProps['attributes']): boolean => {
	return !(event || datetime || ticket);
};

const AttendeesDisplay: React.FC<AttendeesEditProps> = ({ attributes }) => {
	const { data, loading, error } = useAttendees(attributes);

	if (loading) {
		return (
			<Placeholder>
				<Spinner />
			</Placeholder>
		);
	}

	if (error) {
		return <Placeholder>{__('There was some error fetching attendees list', 'event_espresso')}</Placeholder>;
	}

	const attendees = data?.espressoAttendees?.nodes || [];

	if (isNewBlock(attributes) && !attendees.length) {
		return (
			<Placeholder>
				{__(
					'To get started, select what event you want to show attendees from in the block settings.',
					'event_espresso'
				)}
			</Placeholder>
		);
	}

	if (!attendees.length) {
		return <Placeholder>{__('There are no attendees for selected options.', 'event_espresso')}</Placeholder>;
	}

	const { showGravatar, avatarSize } = attributes;

	return (
		<AttendeesList
			attendees={attendees}
			showGravatar={showGravatar}
			avatarSize={avatarSize}
			containerClassName={CSS_CLASS_CORE_BLOCKS}
			containerId={'ee-block-event-attendees'}
		/>
	);
};

export default AttendeesDisplay;
