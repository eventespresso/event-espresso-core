/* Internal dependencies */
import ApolloProvider from '../apollo/Apollo';
import { ToastProvider } from './ToastProvider';
import { RelationsProvider } from './RelationsProvider';
import ConfigProvider from './ConfigProvider';

/**
 * A collection of top level providers that are used by multiple parts of the application.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @param {number} eventId
 * @returns {ReactElement} The wrapped element.
 */
const ContextProviders = ({ children, eventId }) => (
	<ToastProvider>
		<ApolloProvider>
			<ConfigProvider>
				<RelationsProvider eventId={eventId}>{children}</RelationsProvider>
			</ConfigProvider>
		</ApolloProvider>
	</ToastProvider>
);

export default ContextProviders;
