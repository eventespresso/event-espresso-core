import React from 'react';
import { Portal as ChakraPortal, PortalProps } from '@chakra-ui/core';

const Portal: React.FC<PortalProps> = (props) => <ChakraPortal {...props} />;

export default Portal;
