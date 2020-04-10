import React from 'react';
import { ISpinnerProps } from '@chakra-ui/core';

import Spinner from './Spinner';

const LoadingIndicator: React.FC<ISpinnerProps> = (props) => {
	return <Spinner {...props} size='lg' />;
};

export default LoadingIndicator;
