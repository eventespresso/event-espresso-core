import React from 'react';

import BaseUIProvider from './BaseUIProvider';

const withBaseProvider = <Props extends {}>(Component: React.ComponentType<Props>): React.FC<Props> => (
	props: Props
) => {
	return (
		<BaseUIProvider>
			<Component {...props} />
		</BaseUIProvider>
	);
};

export default withBaseProvider;
