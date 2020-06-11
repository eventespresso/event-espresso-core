import React from 'react';
import { any } from 'ramda';
import { __ } from '@wordpress/i18n';

import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useDataState } from '../data';

const DefaultPricesInfo = () => {
	const { prices } = useDataState();
	const hasDefaultPrice = any(isDefault, prices);

	return (
		hasDefaultPrice && (
			<div className='ee-tpc__default-prices-info'>
				<a href='/wp-admin/admin.php?page=pricing' target='_blank'>
					{__('Modify default prices.')}
				</a>
			</div>
		)
	);
};

export default DefaultPricesInfo;
