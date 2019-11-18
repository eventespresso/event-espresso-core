/* Internal dependencies */
import ApolloProvider from '../../apollo/Apollo';

/**
 * A collection of top level providers that are used by multiple parts of the application.
 *
 * @param {ReactElement} children The element that should be wrapped.
 *
 * @returns {ReactElement} The wrapped element.
 */
const TopLevelProviders = ( { children } ) => (
	<ApolloProvider>
		{ children }
	</ApolloProvider>
);

export default TopLevelProviders;
