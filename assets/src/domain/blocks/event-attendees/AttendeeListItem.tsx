import React from 'react';
import { Fragment } from '@wordpress/element';

import AvatarImage from '../components/AvatarImage';

interface AttendeeListItemProps {
	attendee: any; // TODO add types for attendee
	avatarSize?: number;
	showGravatar?: boolean;
}

const AttendeeListItem: React.FC<AttendeeListItemProps> = ({ attendee, showGravatar, avatarSize }) => {
	return (
		<Fragment>
			<li>
				{showGravatar && attendee.avatar && (
					<AvatarImage url={attendee.avatar} height={avatarSize} width={avatarSize} />
				)}
				<span>{attendee.fullName}</span>
			</li>
		</Fragment>
	);
};
export default AttendeeListItem;
