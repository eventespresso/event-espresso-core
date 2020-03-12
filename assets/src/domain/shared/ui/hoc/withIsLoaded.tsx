import React from 'react';

import { useStatus, TypeName } from '@appServices/apollo/status';

interface ComponentProps {
	loaded: boolean;
}

type IsLoadedHOC = <Props>(Component: React.FC<ComponentProps & Props>, props?: Props) => React.FC<ComponentProps>;

/**
 * `loaded` prop of the component returned by isLoadedHOC can be
 * from a parent isLoadedHOC. It allows nesting of isLoadedHOC like
 *
 * ```ts
 *     const SomeComponent: React.FC = () => {
 *         const withPricesLoaded = withIsLoaded(TypeName.prices);
 *         const withDatesLoaded = withIsLoaded(TypeName.datetimes);
 *
 *         return withDatesLoaded( withPricesLoaded(({ loaded }) => {
 *             return loaded && <span>{'Dates and Prices loaded'}</span>
 *         }));
 *     }
 * ```
 */
const withIsLoaded = (typeName: TypeName): IsLoadedHOC => {
	const isLoadedHOC: IsLoadedHOC = (Component, props) => {
		return ({ loaded: parentLoaded }) => {
			const { isLoaded } = useStatus();

			const loaded = (typeof parentLoaded === 'undefined' || parentLoaded) && isLoaded(typeName);

			return <Component {...props} loaded={loaded} />;
		};
	};

	return isLoadedHOC;
};

export default withIsLoaded;
