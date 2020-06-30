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
import DefaultTaxesInfo from './DefaultTaxesInfo';

import './styles.scss';

export interface TicketPriceCalculatorProps {
	context?: 'standalone' | 'editTicketForm';
}

const TicketPriceCalculator: React.FC<TicketPriceCalculatorProps> = ({ context }) => {
	// initialize state listeners
	useInitStateListeners();

	const dataState = useDataState();

	if (!dataState.prices?.length) {
		return (
			<>
				<NoPricesBanner context={context} />
				<DebugInfo data={dataState} />
			</>
		);
	}

	return (
		<>
			<Table prices={dataState.prices} />

			<DefaultTaxesInfo />

			<ButtonRow rightAligned>
				<DebugInfo data={dataState} />
				<DefaultPricesInfo />
				<TaxesButtons />
				<DeleteAllPricesButton />
			</ButtonRow>
		</>
	);
};

export default TicketPriceCalculator;
