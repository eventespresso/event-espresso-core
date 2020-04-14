import React from 'react';
import { __ } from '@wordpress/i18n';

import { IconButton, IconButtonProps } from '@appInputs/Button';
import { Calculator } from '@appDisplay/icons';
import { BaseProps } from '../types';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';
import { useTicketPriceCalculator } from '../hooks';

interface TPCButtonProps extends BaseProps, IconButtonProps {}

const TicketPriceCalculatorButton: React.FC<TPCButtonProps> = ({ ticketId, ...buttonProps }) => {
	const { ModalContainer, onOpen, ...disclosure } = useTicketPriceCalculator();

	const tooltipProps = { placement: 'left' as 'left' };
	return (
		<>
			<IconButton
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
