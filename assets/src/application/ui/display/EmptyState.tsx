import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';

interface EmptyStateProps {
	children?: React.ReactNode;
	className?: string;
	description: string;
	title?: string;
}

const EmptyState = ({ className, children, description, title }: EmptyStateProps) => {
	return (
		<Alert
			status='warning'
			variant='subtle'
			flexDirection='column'
			justifyContent='center'
			textAlign='center'
			height='200px'
		>
			<AlertIcon name='question-outline' size='96px' color='gray.100' />

			<AlertTitle mt={4} mb={1} fontSize='lg'>
				{title}
			</AlertTitle>
			{description && (
				<AlertDescription maxWidth='sm'>
					Thanks for submitting your application. Our team will get back to you soon.
				</AlertDescription>
			)}
			{children && children}
		</Alert>
	);
};

export default React.memo(EmptyState);
