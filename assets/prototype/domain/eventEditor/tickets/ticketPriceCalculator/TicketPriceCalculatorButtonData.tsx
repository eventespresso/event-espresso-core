import React from 'react';

import TicketPriceCalculatorButton from './TicketPriceCalculatorButton';
import { WithTicketProp } from './types';
import { useTicketContext } from '../../hooks';

const TicketPriceCalculatorButtonData: React.FC<WithTicketProp> = ({ ticket }): JSX.Element => {
	const { editors, editorState } = useTicketContext();
	const isOpen = editorState.isEditorOpen(editors.calculator);
	const onClose = (): void => editorState.closeEditor(editors.calculator);
	const onOpen = (): void => editorState.openEditor(editors.calculator);

	return <TicketPriceCalculatorButton ticket={ticket} onOpen={onOpen} onClose={onClose} isOpen={isOpen} />;
};

export default TicketPriceCalculatorButtonData;
