import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import useConfig from '@appServices/config/useConfig';
import { useEdtrState } from '@edtrHooks/edtrState';

const DefaultPricesInfo = () => {
	const config = useConfig();
	const adminUrl = config?.siteUrl?.admin;
	const href = adminUrl + 'admin.php?page=pricing';

	const { setPricesPollInterval } = useEdtrState();

	const onClickLink = useCallback(() => {
		setPricesPollInterval(4000); // 4 seconds
	}, [setPricesPollInterval]);

	return (
		<div className='ee-tpc__default-prices-info'>
			<a href={href} target='_blank' rel='noopener noreferrer' onClick={onClickLink}>
				{__('Modify default prices.')}
			</a>
		</div>
	);
};

export default DefaultPricesInfo;
