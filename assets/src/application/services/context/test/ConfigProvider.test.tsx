import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ConfigConsumer } from '../ConfigProvider';
import { Config } from '../../config/types';
import { mockEeJsData } from '../../config/test/data';
import { ApolloMockedProvider } from '../../../../domain/eventEditor/services/context/TestContext';

describe('ConfigProvider', () => {
	it('checks for ConfigProvider setConfig function', () => {
		let configData: Config = null;
		const consumer = (
			<ConfigConsumer>
				{(_config_) => {
					configData = _config_;
					return null;
				}}
			</ConfigConsumer>
		);
		render(consumer, {
			wrapper: ApolloMockedProvider(),
		});
		expect(configData.setConfig).toBeInstanceOf(Function);
	});

	it('checks for brandName in config data', () => {
		const consumer = (
			<ConfigConsumer>
				{(configData) => {
					const value = configData.config.brandName;
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
				{(configData) => {
					const userLocale = configData.config.locale.user;
					const siteLocale = configData.config.locale.site;
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
