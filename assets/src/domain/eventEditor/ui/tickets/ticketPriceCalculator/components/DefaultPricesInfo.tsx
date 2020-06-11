import React from 'react';
import { any } from 'ramda';
import { __ } from '@wordpress/i18n';

import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';
import useConfig from '@appServices/config/useConfig';
import { useDataState } from '../data';

const DefaultPricesInfo = () => {
	const config = useConfig();
	const adminUrl = config.siteUrl.admin;
	const href = adminUrl + '/admin.php?page=pricing';

	const { prices } = useDataState();
	const hasDefaultPrice = any(isDefault, prices);

	return (
		hasDefaultPrice && (
			<div className='ee-tpc__default-prices-info'>
				<a href={href} target='_blank'>
					{__('Modify default prices.')}
				</a>
			</div>
		)
	);
};

export default DefaultPricesInfo;
