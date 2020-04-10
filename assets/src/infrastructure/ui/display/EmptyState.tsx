import React from 'react';
import classNames from 'classnames';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';

interface EmptyStateProps {
	children?: React.ReactNode;
	className?: string;
	description: string;
	title?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ children, description, title, ...props }) => {
	const className = classNames(props.className, 'ee-empty-state');

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
