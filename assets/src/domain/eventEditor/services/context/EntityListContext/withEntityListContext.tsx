import React from 'react';

const withEntityListContext = (
	Provider: React.ReactType,
	Component: React.ReactType,
	props?: any
): React.FC => (): JSX.Element => {
	return (
		<Provider>
			<Component {...props} />
		</Provider>
	);
};

export default withEntityListContext;
