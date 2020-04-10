import React from 'react';
import { Avatar as ChakraAvatar, AvatarBadge, IAvatar, BoxProps } from '@chakra-ui/core';

interface AvatarProps extends IAvatar {
	badgeProps?: BoxProps;
	userName?: string;
}

const Avatar: React.FC<AvatarProps> = ({ badgeProps, userName, ...avatarProps }) => {
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
