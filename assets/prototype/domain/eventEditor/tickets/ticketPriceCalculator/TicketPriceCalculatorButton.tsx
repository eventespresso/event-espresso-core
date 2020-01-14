import React from 'react';
import { Button } from '@blueprintjs/core/lib/esm';

import TicketPriceCalculatorModal from './TicketPriceCalculatorModal';
import { TpcButtonDataProps, TpcModalProps } from './types';

const TicketPriceCalculatorButton: React.FunctionComponent<TpcButtonDataProps & TpcModalProps> = ({
	ticket,
	isOpen,
	onOpen,
	onClose,
}) => {
	return (
		<>
			<Button icon={'calculator'} onClick={onOpen} minimal />
			<TicketPriceCalculatorModal ticket={ticket} onClose={onClose} isOpen={isOpen} />
		</>
	);
};

export default TicketPriceCalculatorButton;
