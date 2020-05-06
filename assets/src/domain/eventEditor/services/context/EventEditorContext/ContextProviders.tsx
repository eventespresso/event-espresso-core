import React from 'react';

import withApollo from '@dataServices/apollo/withApollo';
import { RelationsProvider } from '@appServices/context/RelationsProvider';
import { StatusProvider } from '@appServices/context/StatusProvider';
import { ConfigProvider } from '@appServices/context/ConfigProvider';
import { FormModalProvider } from '@appServices/context/FormModalProvider';
import { ThemeProvider } from '@appServices/theme';
import { EventIdProvider } from '../EventContext';
import { EdtrStateProvider } from '../EdtrStateContext';

/**
 * A collection of top level providers that are used by multiple parts of the application.
 * This is also shared by unit tests.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const CommonProviders: React.FC = ({ children }) => (
	<ThemeProvider>
		<StatusProvider>
			<ConfigProvider>
				<EventIdProvider>
					<RelationsProvider>
						<FormModalProvider>
							<EdtrStateProvider>{children}</EdtrStateProvider>
						</FormModalProvider>
					</RelationsProvider>
				</EventIdProvider>
			</ConfigProvider>
		</StatusProvider>
	</ThemeProvider>
);

export const ContextProviders = withApollo(CommonProviders);

export default ContextProviders;
