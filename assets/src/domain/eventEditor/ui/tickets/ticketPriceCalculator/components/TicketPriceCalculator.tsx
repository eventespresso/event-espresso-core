import React from 'react';
import { __ } from '@wordpress/i18n';

import { DebugInfo } from '@appDisplay/index';
import Table from './table/Table';
import { useDataState } from '../data';
import { useInitStateListeners } from '../stateListeners';
import NoPricesBanner from './NoPricesBanner';
import DefaultPricesInfo from './DefaultPricesInfo';

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
			{debugInfo}
		</>
	);
};

export default TicketPriceCalculator;
