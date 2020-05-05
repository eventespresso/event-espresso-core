import React from 'react';

import AvatarImage from '../components/AvatarImage';

interface AttendeeListItemProps {
	attendee: any; // TODO add types for attendee
	avatarSize?: number;
	showGravatar?: boolean;
}

const AttendeeListItem: React.FC<AttendeeListItemProps> = ({ attendee, showGravatar, avatarSize }) => {
	return (
		<li>
			{showGravatar && attendee.avatar && (
				<AvatarImage url={attendee.avatar} height={avatarSize} width={avatarSize} />
			)}
			<span>{attendee.fullName}</span>
		</li>
	);
};
export default AttendeeListItem;
