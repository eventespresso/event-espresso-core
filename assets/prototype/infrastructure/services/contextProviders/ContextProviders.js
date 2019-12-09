/* Internal dependencies */
import ApolloProvider from '../apollo/Apollo';
import { ToastProvider } from './ToastProvider';
import { RelationsProvider } from './RelationsProvider';
import { StatusProvider } from './StatusProvider';
import ConfigProvider from './ConfigProvider';

/**
 * A collection of top level providers that are used by multiple parts of the application.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
const ContextProviders = ({ children }) => (
	<ToastProvider>
		<ApolloProvider>
			<StatusProvider>
				<ConfigProvider>
					<RelationsProvider>{children}</RelationsProvider>
				</ConfigProvider>
			</StatusProvider>
		</ApolloProvider>
	</ToastProvider>
);

export default ContextProviders;
