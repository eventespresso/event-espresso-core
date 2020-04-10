import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';

const Error = ({ description, title }) => {
	return (
		<Alert
			status='error'
			variant='subtle'
			flexDirection='column'
			justifyContent='center'
			textAlign='center'
			height='200px'
		>
			<AlertIcon size='40px' mr={0} />
			<AlertTitle mt={4} mb={1} fontSize='lg'>
				{title}
			</AlertTitle>
			<AlertDescription maxWidth='sm'>{description}</AlertDescription>
		</Alert>
	);
};

export default Error;
