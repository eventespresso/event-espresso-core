import React from 'react';
import { EspressoButton, EspressoButtonProps } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import { BaseProps } from '../types';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';
import { useTicketPriceCalculatorModal } from '../hooks';

interface TPCButtonProps extends BaseProps, EspressoButtonProps {}

const TicketPriceCalculatorButton: React.FC<TPCButtonProps> = ({ ticketId, ...buttonProps }) => {
	const { openModal } = useTicketPriceCalculatorModal({ ticketId });

	return (
		<EspressoButton
			icon='calculator'
			onClick={openModal}
			tooltip={__('ticket price calculator')}
			tooltipProps={{ placement: 'left' }}
			{...buttonProps}
		/>
	);
};

export default withIsLoaded<TPCButtonProps>(TypeName.prices, ({ loaded, ticketId, ...buttonProps }) => {
	/* Hide price calculator unless prices are loaded */
	return loaded && <TicketPriceCalculatorButton ticketId={ticketId} {...buttonProps} />;
});
