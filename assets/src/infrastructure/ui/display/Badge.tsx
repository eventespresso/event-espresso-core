import React from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/core';

import { BadgeProps } from './types';

const Badge: React.FC<BadgeProps> = ({ children, ...props }) => <ChakraBadge {...props}>{children}</ChakraBadge>;

export default Badge;
