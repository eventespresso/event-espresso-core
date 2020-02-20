import React from 'react';
import { EspressoButton } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import { TpcButtonDataProps } from '../types';
import { useEditorModal } from '../../../../../../application/ui/layout/editorModal';

const TicketPriceCalculatorButton: React.FC<TpcButtonDataProps> = ({ ticketId, ...buttonProps }) => {
	const { openEditor } = useEditorModal();

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

export default TicketPriceCalculatorButton;
