import React from 'react';

import { useStatus, TypeName } from '@appServices/apollo/status';

interface ComponentProps {
	loaded: boolean;
}

type IsLoadedHOC = <Props>(Component: React.FC<ComponentProps & Props>, props?: Props) => React.FC;

const withIsLoaded = (typeName: TypeName): IsLoadedHOC => {
	const isLoadedHOC: IsLoadedHOC = (Component, props): React.FC => {
		return () => {
			const { isLoaded } = useStatus();
			return <Component {...props} loaded={isLoaded(typeName)} />;
		};
	};

	return isLoadedHOC;
};

export default withIsLoaded;
