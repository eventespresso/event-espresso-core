import React from 'react';
import { __ } from '@wordpress/i18n';

import { Divider } from '@infraUI/display';
import { ButtonRow } from '@application/ui/input';
import { DebugInfo } from '@appDisplay/index';

import AddDefaultTaxesButton from '../buttons/AddDefaultTaxesButton';
import DefaultPricesInfo from './DefaultPricesInfo';
import DeleteAllPricesButton from '../buttons/DeleteAllPricesButton';
import NoPricesBanner from './NoPricesBanner';
import Table from './table/Table';
import { useDataState } from '../data';
import { useInitStateListeners } from '../stateListeners';

import './styles.scss';

const TicketPriceCalculator: React.FC = () => {
	// initialize state listeners
	useInitStateListeners();

	const dataState = useDataState();

	const debugInfo = <DebugInfo data={dataState} />;

	if (!dataState.prices?.length) {
		return (
			<>
				<NoPricesBanner />
				{debugInfo}
			</>
		);
	}

	return (
		<>
			<Table prices={dataState.prices} />

			<DefaultPricesInfo />

			<Divider orientation='horizontal' />

			<ButtonRow rightAligned>
				<DeleteAllPricesButton />
				<AddDefaultTaxesButton />
			</ButtonRow>

			{debugInfo}
		</>
	);
};

export default TicketPriceCalculator;
