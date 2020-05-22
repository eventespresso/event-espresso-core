import React from 'react';
import { __ } from '@wordpress/i18n';

import { Alert } from '@infraUI/display';
import AddDefaultPricesButton from '../buttons/AddDefaultPricesButton';

const NoPricesBanner = () => {
	const description = __('This ticket has no prices');
	const title = __('Free ticket');
	return (
		<Alert description={description} status='info' title={title}>
			<AddDefaultPricesButton />
		</Alert>
	);
};

export default NoPricesBanner;
