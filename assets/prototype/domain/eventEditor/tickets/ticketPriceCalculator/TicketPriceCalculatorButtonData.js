import { useContext } from 'react';
import TicketPriceCalculatorButton from './TicketPriceCalculatorButton';
import { TicketContext } from '../../context/TicketProvider';

const TicketPriceCalculatorButtonData = ({ ticket }) => {
	const { editors, editorState } = useContext(TicketContext);
	const isOpen = editorState.getIsOpen(editors.calculator);
	const onOpen = editorState.setIsOpen(editors.calculator);
	const handleClose = editorState.onClose(editors.calculator);

	return <TicketPriceCalculatorButton ticket={ticket} onOpen={onOpen} onClose={handleClose} isOpen={isOpen} />;
};

export default TicketPriceCalculatorButtonData;
