import React from 'react';

import { ContextProvider } from './ContextProvider';
import { WithContextProps } from './types';

const withContext = (Component: React.ComponentType, props: WithContextProps) => {
	return (
		<ContextProvider {...props}>
			<Component />
		</ContextProvider>
	);
};

export default withContext;
