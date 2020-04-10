import React from 'react';
import { IAlert } from '@chakra-ui/core';

import Error from './Error';

interface Props extends IAlert {
	description: string;
	title: string;
}

const EspressoAlert: React.FC<Props> = ({ description, status, title }) => {
	if (status === 'error') {
		return <Error description={description} title={title} />;
	}

	return null;
};

export default React.memo(EspressoAlert);
