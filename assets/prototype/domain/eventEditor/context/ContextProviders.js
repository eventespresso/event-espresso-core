/* Internal dependencies */
import ApolloProvider from '../../../infrastructure/services/apollo/Apollo';
import { ToastProvider } from '../../../application/services/context/ToastProvider';
import { RelationsProvider } from '../../../application/services/context/RelationsProvider';
import { StatusProvider } from '../../../application/services/context/StatusProvider';
import ConfigProvider from '../../../application/services/context/ConfigProvider';
import { EventEditorEventIdProvider } from '../../../application/services/context/EventEditorEventIdProvider';

/**
 * A collection of top level providers that are used by multiple parts of the application.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
const ContextProviders = ({ children }) => (
	<ToastProvider>
		<ApolloProvider>
			<EventEditorEventIdProvider>
				<StatusProvider>
					<ConfigProvider>
						<RelationsProvider>{children}</RelationsProvider>
					</ConfigProvider>
				</StatusProvider>
			</EventEditorEventIdProvider>
		</ApolloProvider>
	</ToastProvider>
);

export default ContextProviders;
