import React from 'react';
import { EspressoButton } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import { TpcButtonDataProps } from '../types';
import { useFormModal } from '@appLayout/formModal';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';

const TicketPriceCalculatorButton: React.FC<TpcButtonDataProps> = ({ ticketId, ...buttonProps }) => {
	const { openEditor } = useFormModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'ticketPriceCalculator',
			entityId: ticketId,
		});
	};
	return (
		<EspressoButton
			icon='calculator'
			onClick={onClick}
			tooltip={__('ticket price calculator')}
			tooltipProps={{ placement: 'left' }}
			{...buttonProps}
		/>
	);
};

export default withIsLoaded<TpcButtonDataProps>(TypeName.prices, ({ loaded, ticketId }) => {
	/* Hide price calculator unless prices are loaded */
	return loaded && <TicketPriceCalculatorButton ticketId={ticketId} />;
});
