import React from 'react';
import { Avatar as ChakraAvatar, AvatarBadge, IAvatar, BoxProps } from '@chakra-ui/core';

interface Props extends IAvatar {
	badgeProps?: BoxProps;
	userName?: string;
}

const Avatar = ({ badgeProps, userName, ...avatarProps }: Props) => {
	if (badgeProps) {
		return (
			<ChakraAvatar {...avatarProps}>
				<AvatarBadge {...badgeProps} />
			</ChakraAvatar>
		);
	}

	if (userName) {
		const size = avatarProps.size || 'lg';
		return <ChakraAvatar {...avatarProps} name={userName} size={size} />;
	}

	return <ChakraAvatar {...avatarProps} />;
};

export default Avatar;
