import React from 'react';
import classNames from 'classnames';

import { useMemoStringify } from '@application/services/hooks';

import Banner from './Banner';

interface EmptyStateProps {
	children?: React.ReactNode;
	className?: string;
	description: string;
	title?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ children, description, title, ...props }) => {
	const className = classNames(props.className, 'ee-empty-state');
	const iconProps = useMemoStringify({ name: 'question-outline' });

	return (
		<Banner
			backgroundColor='var(--ee-color-grey-15)'
			className={className}
			description={description}
			flexDirection='column'
			justifyContent='center'
			iconProps={iconProps}
			status='warning'
			textAlign='center'
			title={title}
			variant='subtle'
		>
			{children && children}
		</Banner>
	);
};

export default React.memo(EmptyState);
