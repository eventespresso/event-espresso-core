import React from 'react';
import { any } from 'ramda';
import { __ } from '@wordpress/i18n';

import { DebugInfo } from '@appDisplay/index';
import Table from './table/Table';
import { useDataState } from '../data';
import { useInitStateListeners } from '../stateListeners';
import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';

import './styles.scss';

const TicketPriceCalculator: React.FC = () => {
	// initialize state listeners
	useInitStateListeners();

	const dataState = useDataState();

	const hasDefaultPrice = any(isDefault, dataState.prices);

	return (
		<>
			<Table prices={dataState.prices} />
			{hasDefaultPrice && (
				<div>
					{__('Note:')} {__('Default prices cannot be moified here.')}
				</div>
			)}
			<DebugInfo data={dataState} />
		</>
	);
};

export default TicketPriceCalculator;
