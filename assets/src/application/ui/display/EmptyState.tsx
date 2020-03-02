import * as React from 'react';
import { Empty, Typography } from 'antd';

const { Text, Title } = Typography;

interface EmptyStateProps {
	children?: React.ReactNode;
	className?: string;
	description: string;
	title?: string;
}

const EmptyState = ({ className, children, description, title }: EmptyStateProps) => {
	return (
		<Empty className={className} description='' image={Empty.PRESENTED_IMAGE_SIMPLE}>
			{title && (
				<Title type='secondary' level={4}>
					{title}
				</Title>
			)}
			{description && <Text>{description}</Text>}
			{children && children}
		</Empty>
	);
};

export default EmptyState;
