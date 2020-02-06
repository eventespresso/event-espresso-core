/**
 * External dependencies
 */
import * as React from 'react';
import { Empty } from 'antd';

interface EmptyStateProps {
	children: React.ReactChild;
	description: string;
	title: string;
}

const EmptyState = (props: EmptyStateProps) => {
	const { children, description, title } = props;

	return (
		<>
			<Empty
				description={
					<div>
						<div>{title}</div>
						<span>{description}</span>
					</div>
				}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
			/>

			{children}
		</>
	);
};

export default EmptyState;
