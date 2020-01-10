import { Button } from '@blueprintjs/core/lib/esm';
import TicketPriceCalculatorModal from './TicketPriceCalculatorModal';

const TicketPriceCalculatorButton = ({ ticket, isOpen, onOpen, onClose }) => {
	return (
		<>
			<Button icon={'calculator'} onClick={() => onOpen()} minimal />
			<TicketPriceCalculatorModal ticket={ticket} onClose={onClose} isOpen={isOpen} />
		</>
	);
};

export default TicketPriceCalculatorButton;
