import React from 'react';

import AttendeeListItem from './AttendeeListItem';

interface AttendeesListProps {
	attendees: Array<any>; // TODO add types for attendee
	avatarSize?: number;
	showGravatar?: boolean;
	containerClassName?: string;
	containerId?: string;
}

const AttendeesList: React.FC<AttendeesListProps> = ({
	attendees,
	avatarSize,
	containerClassName,
	containerId,
	showGravatar,
}) => {
	return (
		<div id={containerId} className={containerClassName + ' event-attendees'}>
			{attendees.map((attendee) => {
				return (
					<AttendeeListItem
						attendee={attendee}
						avatarSize={avatarSize}
						key={attendee.id}
						showGravatar={showGravatar}
					/>
				);
			})}
		</div>
	);
};

export default AttendeesList;
