import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoIconButton, EspressoIconButtonProps } from '@appInputs/EspressoButton';
import { Calculator } from '@appDisplay/espressoIcons';
import { BaseProps } from '../types';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';
import { useTicketPriceCalculator } from '../hooks';

interface TPCButtonProps extends BaseProps, EspressoIconButtonProps {}

const TicketPriceCalculatorButton: React.FC<TPCButtonProps> = ({ ticketId, ...buttonProps }) => {
	const { ModalContainer, onOpen, ...disclosure } = useTicketPriceCalculator();

	const tooltipProps = { placement: 'left' as 'left' };
	return (
		<>
			<EspressoIconButton
				icon={Calculator}
				onClick={onOpen}
				tooltip={__('ticket price calculator')}
				tooltipProps={tooltipProps}
				variant='ghost'
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
