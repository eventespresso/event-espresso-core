import { useContext } from 'react';
import TicketPriceCalculatorButton from './TicketPriceCalculatorButton';
import { TicketContext } from '../../context/TicketProvider';

const TicketPriceCalculatorButtonData = ({ ticket }) => {
	const { editorIds, editorState } = useContext(TicketContext);
	const editorId = editorIds.calculator;
	const isOpen = editorState.getIsOpen(editorId);
	const onClose = () => editorState.onClose(editorId);
	const onOpen = () => editorState.setIsOpen(editorId);

	return <TicketPriceCalculatorButton ticket={ticket} onOpen={onOpen} onClose={onClose} isOpen={isOpen} />;
};

export default TicketPriceCalculatorButtonData;
