import { useContext } from 'react';
import TicketPriceCalculatorButton from './TicketPriceCalculatorButton';
import { TicketContext } from '../../context/TicketProvider';

const TicketPriceCalculatorButtonData = ({ ticket }) => {
	const { editors, editorState } = useContext(TicketContext);
	const isOpen = editorState.isEditorOpen(editors.calculator);
	const onClose = () => editorState.closeEditor(editors.calculator);
	const onOpen = () => editorState.openEditor(editors.calculator);

	return <TicketPriceCalculatorButton ticket={ticket} onOpen={onOpen} onClose={handleClose} isOpen={isOpen} />;
};

export default TicketPriceCalculatorButtonData;
