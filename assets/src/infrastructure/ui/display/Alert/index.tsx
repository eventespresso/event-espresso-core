import React from 'react';
import { IAlert } from '@chakra-ui/core';

import Error from './Error';

interface AlertProps extends IAlert {
	description: string;
	title: string;
}

const Alert: React.FC<AlertProps> = ({ description, status, title }) => {
	if (status === 'error') {
		return <Error description={description} title={title} />;
	}

	return null;
};

export default React.memo(Alert);
