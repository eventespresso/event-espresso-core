import React from 'react';
import { Avatar as DefaultAvatar, Badge } from 'antd';
import { AvatarProps } from 'antd/lib/avatar';
import { BadgeProps } from 'antd/lib/badge';

interface Props extends AvatarProps {
	badgeProps?: BadgeProps;
	userName?: string;
}

const Avatar = ({ badgeProps, userName, ...avatarProps }: Props) => {
	if (badgeProps) {
		return (
			<Badge {...badgeProps}>
				<DefaultAvatar {...avatarProps} />
			</Badge>
		);
	}

	if (userName) {
		const size = avatarProps.size || 'large';

		return (
			<DefaultAvatar {...avatarProps} size={size}>
				{userName}
			</DefaultAvatar>
		);
	}

	return <DefaultAvatar {...avatarProps} />;
};

export default Avatar;
