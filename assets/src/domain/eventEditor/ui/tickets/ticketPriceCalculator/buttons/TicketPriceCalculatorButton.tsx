import React from 'react';
import { EspressoButton } from '@application/ui/input';

import { TpcButtonDataProps } from '../types';
import { useEditorModal } from '../../../../../../application/ui/layout/editorModal';

const TicketPriceCalculatorButton: React.FC<TpcButtonDataProps> = ({ ticketId }) => {
	const { openEditor } = useEditorModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'ticketPriceCalculator',
			entityId: ticketId,
		});
	};
	return <EspressoButton icon='calculator' onClick={onClick} />;
};

export default TicketPriceCalculatorButton;
