/**
 * External dependencies
 */
import * as React from 'react';
import { __ } from '@wordpress/i18n';
import { Empty } from 'antd';

interface EmptyStateProps {
	children?: React.ReactNode;
	className?: string;
	description: string;
	title?: string;
}

const EmptyState = ({ className, children, description, title }: EmptyStateProps) => {
	return (
		<div className={className}>
			<Empty
				description={
					<>
						{title && __(title)}
						<span>{__(description)}</span>
					</>
				}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
			/>

			{children && children}
		</div>
	);
};

export default EmptyState;
