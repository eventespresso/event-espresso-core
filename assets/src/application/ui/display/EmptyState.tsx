import * as React from 'react';
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
						{title && title}
						<span>{description}</span>
					</>
				}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
			/>

			{children && children}
		</div>
	);
};

export default EmptyState;
