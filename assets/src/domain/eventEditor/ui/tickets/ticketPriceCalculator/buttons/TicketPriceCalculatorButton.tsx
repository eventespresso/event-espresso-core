import React from 'react';
import { EspressoButton } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import { BaseProps } from '../types';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';
import { useTicketPriceCalculatorModal } from '../hooks';

const TicketPriceCalculatorButton: React.FC<BaseProps> = ({ ticketId }) => {
	const { openModal } = useTicketPriceCalculatorModal({ ticketId });

	return (
		<EspressoButton
			icon='calculator'
			onClick={openModal}
			tooltip={__('ticket price calculator')}
			tooltipProps={{ placement: 'left' }}
		/>
	);
};

export default withIsLoaded<BaseProps>(TypeName.prices, ({ loaded, ticketId }) => {
	/* Hide price calculator unless prices are loaded */
	return loaded && <TicketPriceCalculatorButton ticketId={ticketId} />;
});
