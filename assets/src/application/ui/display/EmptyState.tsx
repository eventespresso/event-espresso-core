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
			backgroundColor='var(--ee-color-grey-15)'
			className={className}
			flexDirection='column'
			justifyContent='center'
			status='warning'
			variant='subtle'
			textAlign='center'
		>
			<AlertIcon name='question-outline' size='96px' color='gray.100' />

			<AlertTitle mt={4} mb={1} fontSize='lg'>
				{title}
			</AlertTitle>

			{description && <AlertDescription maxWidth='sm'>{description}</AlertDescription>}

			{children && children}
		</Alert>
	);
};

export default React.memo(EmptyState);
