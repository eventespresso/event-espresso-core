/* Internal dependencies */
import ApolloProvider from '../apollo/Apollo';
import { ToastProvider } from './ToastProvider';

/**
 * A collection of top level providers that are used by multiple parts of the application.
 *
 * @param {ReactElement} children The element that should be wrapped.
 *
 * @returns {ReactElement} The wrapped element.
 */
const ContextProviders = ({ children }) => (
	<ToastProvider>
		<ApolloProvider>
			{ children }
		</ApolloProvider>
	</ToastProvider>
);

export default ContextProviders;
