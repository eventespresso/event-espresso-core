import React, { useCallback } from 'react';
import { any } from 'ramda';
import { __ } from '@wordpress/i18n';

import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';
import useConfig from '@appServices/config/useConfig';
import { useEdtrState } from '@edtrHooks/edtrState';
import { useDataState } from '../data';

const DefaultPricesInfo = () => {
	const config = useConfig();
	const adminUrl = config?.siteUrl?.admin;
	const href = adminUrl + 'admin.php?page=pricing';

	const { setPricesPollInterval } = useEdtrState();
	const { prices } = useDataState();
	const hasDefaultPrice = any(isDefault, prices);

	const onClickLink = useCallback(() => {
		setPricesPollInterval(4000); // 4 seconds
	}, [setPricesPollInterval]);

	return (
		hasDefaultPrice && (
			<div className='ee-tpc__default-prices-info'>
				<a href={href} target='_blank' rel='noopener noreferrer' onClick={onClickLink}>
					{__('Modify default prices.')}
				</a>
			</div>
		)
	);
};

export default DefaultPricesInfo;
