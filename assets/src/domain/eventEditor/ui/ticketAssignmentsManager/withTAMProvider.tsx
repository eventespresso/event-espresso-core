import React from 'react';
import { TAMProvider } from './TAMProvider';

const withTAMProvider = (Component: React.ComponentType, props: any) => {
	return (
		<TAMProvider>
			<Component {...props} />
		</TAMProvider>
	);
};

export default withTAMProvider;
