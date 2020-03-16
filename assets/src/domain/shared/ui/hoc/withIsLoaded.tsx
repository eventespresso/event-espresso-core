import React from 'react';

import { useStatus, TypeName } from '@appServices/apollo/status';

interface ComponentProps {
	loaded?: boolean;
}
/**
 * `loaded` prop of the returned component can be
 * from a parent HOC. It allows nesting of HOC like
 *
 * ```ts
 *     const SomeComponent: React.FC = () => {
 *         return <span>{'Dates and Prices loaded'}</span>;
 *     }
 *     export default withIsLoaded(
 *         TypeName.datetimes,
 *         withIsLoaded(TypeName.prices, ({ loaded }) => {
 *             return loaded && <SomeComponent />;
 *         })
 *     );
 * ```
 */
function withIsLoaded<Props>(
	typeName: TypeName,
	Component: React.ComponentType<ComponentProps & Props>
): React.FC<ComponentProps & Props> {
	return ({ loaded: parentLoaded, ...rest }) => {
		const { isLoaded } = useStatus();

		const loaded = (typeof parentLoaded === 'undefined' || parentLoaded) && isLoaded(typeName);

		/**
		 * Cast `rest` as Props to avoid negative side effect
		 * @link https://devblogs.microsoft.com/typescript/announcing-typescript-3-2/#object-spread-on-generic-types
		 */
		return <Component {...rest as Props} loaded={loaded} />;
	};

};

export default withIsLoaded;
