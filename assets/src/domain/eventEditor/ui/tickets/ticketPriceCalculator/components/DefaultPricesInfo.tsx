import React, { useCallback } from 'react';
import { any } from 'ramda';
import { __ } from '@wordpress/i18n';

import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';
import useConfig from '@appServices/config/useConfig';
import { useDataState } from '../data';
import { useEdtrState } from '@edtrHooks/edtrState';

const DefaultPricesInfo = () => {
	const config = useConfig();
	const adminUrl = config?.siteUrl?.admin;
	const href = adminUrl + 'admin.php?page=pricing';

	const { prices } = useDataState();
	const { setPricesPollInterval } = useEdtrState();

	const onClickLink = useCallback(() => {
		setPricesPollInterval(4000); // 4 seconds
	}, [setPricesPollInterval]);

	const hasDefaultPrice = any(isDefault, prices);

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
