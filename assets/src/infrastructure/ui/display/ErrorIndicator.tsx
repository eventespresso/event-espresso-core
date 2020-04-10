import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, IAlert } from '@chakra-ui/core';

interface Props extends IAlert {
	description?: string;
	title?: string;
}

const ErrorIndicator: React.FC<Props> = ({ description, title, ...props }) => {
	return (
		<Alert
			{...props}
			flexDirection='column'
			justifyContent='center'
			status='error'
			variant='subtle'
			textAlign='center'
		>
			<AlertIcon name='warning-2' size='96px' color='red.500' />

			{title && (
				<AlertTitle mt={4} mb={1} fontSize='lg'>
					{title}
				</AlertTitle>
			)}

			{description && <AlertDescription maxWidth='sm'>{description}</AlertDescription>}
		</Alert>
	);
};

export default ErrorIndicator;
