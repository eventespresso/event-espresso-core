import React from 'react';
import { Button } from '@blueprintjs/core/lib/esm';

import { TpcButtonDataProps, TpcModalProps } from '../types';
import { useEditorModal } from '../../../../../../application/ui/components/layout/editorModal';

const TicketPriceCalculatorButton: React.FC<TpcButtonDataProps & TpcModalProps> = ({ ticketId }): JSX.Element => {
	const { openEditor } = useEditorModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'ticketPriceCalculator',
			entityId: ticketId,
		});
	};
	return <Button icon={'calculator'} onClick={onClick} minimal />;
};

export default TicketPriceCalculatorButton;
