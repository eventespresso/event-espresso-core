import React from 'react';

import { ContextProvider } from './ContextProvider';
import { BaseProps } from '../types';

const withContext = (Component: React.ComponentType, props: BaseProps) => {
	return (
		<ContextProvider {...props}>
			<Component />
		</ContextProvider>
	);
};

export default withContext;
