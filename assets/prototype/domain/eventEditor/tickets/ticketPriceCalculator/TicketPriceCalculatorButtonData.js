import { useContext } from 'react';
import TicketPriceCalculatorButton from './TicketPriceCalculatorButton';
import { TicketContext } from '../../context/TicketProvider';

const TicketPriceCalculatorButtonData = ({ ticket }) => {
	const { getIsOpen, onClose, setIsOpen } = useContext(TicketContext);
	const modalId = 'TicketPriceCalculator';
	const isOpen = getIsOpen(modalId);
	const onOpen = () => setIsOpen(modalId);
	const handleClose = () => onClose(modalId);

	return <TicketPriceCalculatorButton ticket={ticket} onOpen={onOpen} onClose={handleClose} isOpen={isOpen} />;
};

export default TicketPriceCalculatorButtonData;
