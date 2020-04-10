import React from 'react';
import { EspressoButton, EspressoButtonProps, Icon } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import { BaseProps } from '../types';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';
import { useTicketPriceCalculator } from '../hooks';

interface TPCButtonProps extends BaseProps, EspressoButtonProps {}

const TicketPriceCalculatorButton: React.FC<TPCButtonProps> = ({ ticketId, ...buttonProps }) => {
	const { ModalContainer, onOpen, ...disclosure } = useTicketPriceCalculator();

	return (
		<>
			<EspressoButton
				icon={Icon.CALCULATOR}
				onClick={onOpen}
				tooltip={__('ticket price calculator')}
				tooltipProps={{ placement: 'left' }}
				{...buttonProps}
			/>
			<ModalContainer ticketId={ticketId} {...disclosure} />
		</>
	);
};

export default withIsLoaded<TPCButtonProps>(TypeName.prices, ({ loaded, ticketId, ...buttonProps }) => {
	/* Hide price calculator unless prices are loaded */
	return loaded && <TicketPriceCalculatorButton ticketId={ticketId} {...buttonProps} />;
});
