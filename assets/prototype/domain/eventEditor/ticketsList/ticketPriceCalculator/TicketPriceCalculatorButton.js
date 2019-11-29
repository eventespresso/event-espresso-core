import { Button } from '@blueprintjs/core/lib/esm';
import { useState } from '@wordpress/element';
import TicketPriceCalculatorModal from './TicketPriceCalculatorModal';

const TicketPriceCalculatorButton = ({ ticket }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(true);
	};
	const handleClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
	};

	return (
		<>
			<Button icon={'calculator'} onClick={handleOpen} minimal />
			<TicketPriceCalculatorModal ticket={ticket} handleClose={handleClose} isOpen={isOpen} />
		</>
	);
};

export default TicketPriceCalculatorButton;
