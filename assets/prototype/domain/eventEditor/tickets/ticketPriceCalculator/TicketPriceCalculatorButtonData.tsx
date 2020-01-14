import React, { useContext } from 'react';

import TicketPriceCalculatorButton from './TicketPriceCalculatorButton';
import { WithTicketProp } from './types';
import { TicketContext, TicketContextProps } from '../../context/TicketProvider';

const TicketPriceCalculatorButtonData: React.FunctionComponent<WithTicketProp> = ({ ticket }): JSX.Element => {
	const { editors, editorState } = useContext<TicketContextProps>(TicketContext);
	const isOpen = editorState.isEditorOpen(editors.calculator);
	const onClose = (): void => editorState.closeEditor(editors.calculator);
	const onOpen = (): void => editorState.openEditor(editors.calculator);

	return <TicketPriceCalculatorButton ticket={ticket} onOpen={onOpen} onClose={onClose} isOpen={isOpen} />;
};

export default TicketPriceCalculatorButtonData;
