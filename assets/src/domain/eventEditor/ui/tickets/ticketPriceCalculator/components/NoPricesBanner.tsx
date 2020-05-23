import React from 'react';
import { __ } from '@wordpress/i18n';

import { Banner } from '@infraUI/display';
import AddDefaultPricesButton from '../buttons/AddDefaultPricesButton';

const NoPricesBanner = () => {
	const description = __('Click the button below to load your default prices into the calculator. Additional ticket price modifiers can be added or removed. Click the save button below to assign which dates this ticket will be available for purchase on.');
	const title = __('This Ticket is Currently Free');
	return (
		<Banner description={description} status='info' title={title}>
			<AddDefaultPricesButton />
		</Banner>
	);
};

export default NoPricesBanner;
