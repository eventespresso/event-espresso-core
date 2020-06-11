import React from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonRow } from '@application/ui/input';
import { DebugInfo } from '@appDisplay/index';

import DefaultPricesInfo from './DefaultPricesInfo';
import DeleteAllPricesButton from '../buttons/DeleteAllPricesButton';
import NoPricesBanner from './NoPricesBanner';
import Table from './table/Table';
import TaxesButtons from '../buttons/taxes/TaxesButtons';
import { useDataState } from '../data';
import { useInitStateListeners } from '../stateListeners';

import './styles.scss';

export interface TicketPriceCalculatorProps {
	context?: 'standalone' | 'editTicketForm';
}

const TicketPriceCalculator: React.FC<TicketPriceCalculatorProps> = ({ context }) => {
	// initialize state listeners
	useInitStateListeners();

	const dataState = useDataState();

	const debugInfo = <DebugInfo data={dataState} />;

	if (!dataState.prices?.length) {
		return (
			<>
				<NoPricesBanner context={context} />
				{debugInfo}
			</>
		);
	}

	return (
		<>
			<Table prices={dataState.prices} />

			<DefaultPricesInfo />

			<ButtonRow rightAligned>
				<DeleteAllPricesButton />
				<TaxesButtons />
			</ButtonRow>

			{debugInfo}
		</>
	);
};

export default TicketPriceCalculator;
