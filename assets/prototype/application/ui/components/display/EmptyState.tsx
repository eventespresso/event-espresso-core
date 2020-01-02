/**
 * External dependencies
 */
import * as React from 'react';
import { Callout, NonIdealState } from '@blueprintjs/core/lib/esm';

interface EmptyStateProps {
	children: React.ReactChild;
	description: string;
	title: string;
}

const EmptyState = (props: EmptyStateProps) => {
	const { children, description, title } = props;

	return (
		<>
			<Callout>
				<NonIdealState icon={'help'} title={title} description={description} />
			</Callout>
			{children}
		</>
	);
};

export default EmptyState;
