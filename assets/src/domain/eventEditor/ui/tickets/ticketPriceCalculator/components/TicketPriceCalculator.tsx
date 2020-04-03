import React from 'react';
import { __ } from '@wordpress/i18n';

import { DebugInfo } from '@appDisplay/index';
import Table from './table/Table';
import { useDataState } from '../data';
import { useInitStateListeners } from '../stateListeners';

import './styles.scss';

const TicketPriceCalculator: React.FC = () => {
	// initialize state listeners
	useInitStateListeners();

	const dataState = useDataState();

	return (
		<>
			<Table prices={dataState.prices} />
			<DebugInfo data={dataState} />
		</>
	);
};

export default TicketPriceCalculator;
