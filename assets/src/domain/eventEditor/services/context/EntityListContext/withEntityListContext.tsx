import React from 'react';

interface ContextHOCArgs {
	Provider: React.ReactType;
	Component: React.ReactType;
	[key: string]: any;
}

const withEntityListContext = ({ Provider, Component, ...props }: ContextHOCArgs): React.FC => {
	const wrappedComponent: React.FC = () => {
		return (
			<Provider>
				<Component {...props} />
			</Provider>
		);
	};

	return wrappedComponent;
};

export default withEntityListContext;
