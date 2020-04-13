import React from 'react';
import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/core';

const Badge: React.FC<BadgeProps> = ({ children, ...props }) => <ChakraBadge {...props}>{children}</ChakraBadge>;

export default Badge;
