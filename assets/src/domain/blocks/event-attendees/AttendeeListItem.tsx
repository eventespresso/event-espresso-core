import React from 'react';

import AvatarImage from '../components/AvatarImage';
import { Attendee } from '@blocksServices/apollo/types';

interface AttendeeListItemProps {
	attendee: Attendee;
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
