import React from 'react';
import { any } from 'ramda';
import { __ } from '@wordpress/i18n';

import { useDataState } from '../data';
import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';

const DefaultPricesInfo = () => {
	const { prices } = useDataState();
	const hasDefaultPrice = any(isDefault, prices);
	return (
		hasDefaultPrice && (
			<div>
				{__('Note:')} {__('Default prices cannot be modified here.')}
			</div>
		)
	);
};

export default DefaultPricesInfo;
