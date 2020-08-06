import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ConfigConsumer } from '../ConfigProvider';
import { mockEeJsData } from '../../config/test/data';
import { ApolloMockedProvider } from '../../../../domain/eventEditor/services/context/TestContext';

describe('ConfigProvider', () => {
	it('checks for brandName in config data', () => {
		const consumer = (
			<ConfigConsumer>
				{(configData): JSX.Element => {
					const value = configData.brandName;
					return <span>{`Brand name: ${value}`}</span>;
				}}
			</ConfigConsumer>
		);
		const { getByText } = render(consumer, {
			wrapper: ApolloMockedProvider(),
		});

		expect(getByText(/^Brand name:/).textContent).toBe('Brand name: ' + mockEeJsData.brandName);
	});

	it('checks for user and site locale in config data', () => {
		const consumer = (
			<ConfigConsumer>
				{(configData): JSX.Element => {
					const userLocale = configData.locale.user;
					const siteLocale = configData.locale.site;
					return (
						<>
							<span>{`User locale: ${userLocale}`}</span>
							<span>{`Site locale: ${siteLocale}`}</span>
						</>
					);
				}}
			</ConfigConsumer>
		);
		const { getByText } = render(consumer, {
			wrapper: ApolloMockedProvider(),
		});

		expect(getByText(/^User locale:/).textContent).toBe('User locale: ' + mockEeJsData.locale.user);
		expect(getByText(/^Site locale:/).textContent).toBe('Site locale: ' + mockEeJsData.locale.site);
	});
});
