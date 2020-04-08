import React from 'react';
import { Avatar as DefaultAvatar, AvatarBadge, IAvatar, BoxProps } from '@chakra-ui/core';

interface Props extends IAvatar {
	badgeProps?: BoxProps;
	userName?: string;
}

const Avatar = ({ badgeProps, userName, ...avatarProps }: Props) => {
	if (badgeProps) {
		return (
			<DefaultAvatar {...avatarProps}>
				<AvatarBadge {...badgeProps} />
			</DefaultAvatar>
		);
	}

	if (userName) {
		const size = avatarProps.size || 'lg';
		return <DefaultAvatar {...avatarProps} name={userName} size={size} />;
	}

	return <DefaultAvatar {...avatarProps} />;
};

export default Avatar;
