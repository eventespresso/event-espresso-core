import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { StatusProvider, StatusConsumer } from '../StatusProvider';
import { TypeName, StatusManager } from '../../apollo/status';

describe('StatusProvider', () => {
	it('checks for statusProvider setter functions', () => {
		let statusProvider: StatusManager = null;
		const consumer = (
			<StatusProvider>
				<StatusConsumer>
					{(_statusProvider_): JSX.Element => {
						statusProvider = _statusProvider_;
						return null;
					}}
				</StatusConsumer>
			</StatusProvider>
		);
		render(consumer);
		expect(statusProvider.setIsLoading).toBeInstanceOf(Function);
		expect(statusProvider.setIsLoaded).toBeInstanceOf(Function);
		expect(statusProvider.setIsError).toBeInstanceOf(Function);
	});

	it('checks for isLoading datetimes', () => {
		const consumer = (
			<StatusProvider>
				<StatusConsumer>
					{(statusProvider): JSX.Element => {
						const value = JSON.stringify(statusProvider.isLoading(TypeName.datetimes));
						return <span>{`Is Loading datetimes: ${value}`}</span>;
					}}
				</StatusConsumer>
			</StatusProvider>
		);
		const { getByText } = render(consumer);
		expect(getByText(/^Is Loading/).textContent).toBe('Is Loading datetimes: false');
	});

	it('checks for isLoaded priceTypes', () => {
		const consumer = (
			<StatusProvider>
				<StatusConsumer>
					{(statusProvider): JSX.Element => {
						const value = JSON.stringify(statusProvider.isLoaded(TypeName.priceTypes));
						return <span>{`Is Loaded priceTypes: ${value}`}</span>;
					}}
				</StatusConsumer>
			</StatusProvider>
		);
		const { getByText } = render(consumer);
		expect(getByText(/^Is Loaded/).textContent).toBe('Is Loaded priceTypes: false');
	});

	it('checks for isError tickets', () => {
		const consumer = (
			<StatusProvider>
				<StatusConsumer>
					{(statusProvider): JSX.Element => {
						const value = JSON.stringify(statusProvider.isError(TypeName.tickets));
						return <span>{`Is isError tickets: ${value}`}</span>;
					}}
				</StatusConsumer>
			</StatusProvider>
		);
		const { getByText } = render(consumer);
		expect(getByText(/^Is isError/).textContent).toBe('Is isError tickets: false');
	});
});
