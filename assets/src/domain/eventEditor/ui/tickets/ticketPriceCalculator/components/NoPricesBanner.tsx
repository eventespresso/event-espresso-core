import React from 'react';
import { __ } from '@wordpress/i18n';

import { Banner } from '@application/ui/display';

import AddDefaultPricesButton from '../buttons/AddDefaultPricesButton';
import { TicketPriceCalculatorProps } from './TicketPriceCalculator';

interface Props extends Pick<TicketPriceCalculatorProps, 'context'> {}

const NoPricesBanner: React.FC<Props> = ({ context }) => {
	let description = __(
		'Click the button below to load your default prices into the calculator. Additional ticket price modifiers can be added or removed.'
	);

	if (context === 'futureUseCase') {
		description =
			description +
			__(' Click the save button below to assign which dates this ticket will be available for purchase on.');
	}

	const title = __('This Ticket is Currently Free');

	return (
		<Banner description={description} status='info' title={title}>
			<AddDefaultPricesButton />
		</Banner>
	);
};

export default NoPricesBanner;
