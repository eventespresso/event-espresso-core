import { useContext } from 'react';
import { Button } from '@blueprintjs/core/lib/esm';
import TicketPriceCalculatorModal from './TicketPriceCalculatorModal';
import { TicketContext } from '../../context/TicketProvider';

const TicketPriceCalculatorButton = ({ ticket }) => {
	const { getIsOpen, onClose, setIsOpen } = useContext(TicketContext);
	const modalId = 'TicketPriceCalculator';
	const isOpen = getIsOpen(modalId);
	const onOpen = () => setIsOpen(modalId);
	const handleClose = () => onClose(modalId);

	console.log({ isOpen });

	return (
		<>
			<Button icon={'calculator'} onClick={onOpen} minimal />
			<TicketPriceCalculatorModal ticket={ticket} handleClose={handleClose} isOpen={true} />
		</>
	);
};

export default TicketPriceCalculatorButton;
