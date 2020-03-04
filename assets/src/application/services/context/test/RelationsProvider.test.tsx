import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { RelationsProvider, RelationsConsumer } from '../RelationsProvider';
import { RelationsManager, RelationalData } from '../../apollo/relations';
import { ApolloMockedProvider } from '../../../../domain/eventEditor/services/context/TestContext';

describe('RelationsProvider', () => {
	it('checks for relationsProvider functions', () => {
		let relationsProvider: RelationsManager = null;
		const consumer = (
			<RelationsProvider>
				<RelationsConsumer>
					{(_relationsProvider_): JSX.Element => {
						relationsProvider = _relationsProvider_;
						return null;
					}}
				</RelationsConsumer>
			</RelationsProvider>
		);
		render(consumer);

		expect(relationsProvider.addRelation).toBeInstanceOf(Function);
		expect(relationsProvider.dropRelations).toBeInstanceOf(Function);
		expect(relationsProvider.getData).toBeInstanceOf(Function);
		expect(relationsProvider.getRelations).toBeInstanceOf(Function);
		expect(relationsProvider.removeRelation).toBeInstanceOf(Function);
		expect(relationsProvider.initialize).toBeInstanceOf(Function);
		expect(relationsProvider.updateRelations).toBeInstanceOf(Function);
	});

	it('checks for relationsProvider data from global context', () => {
		let relationalData: RelationalData = null;
		const consumer = (
			<RelationsConsumer>
				{(relationsProvider): JSX.Element => {
					relationalData = relationsProvider.getData();
					return null;
				}}
			</RelationsConsumer>
		);

		render(consumer, { wrapper: ApolloMockedProvider() });

		expect(relationalData).toHaveProperty('datetimes');
		expect(relationalData).toHaveProperty('tickets');
		expect(relationalData).toHaveProperty('prices');
	});
});
