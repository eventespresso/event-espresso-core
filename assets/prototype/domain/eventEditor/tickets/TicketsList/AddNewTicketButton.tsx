import React from 'react';

import AddNewTicketModal from './AddNewTicketModal';
import useTicketEditorId from '../../context/TicketProvider/useTicketEditorId';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import {
	EditorId,
	EditorState,
} from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';
import { EspressoButton } from '../../../../../ZZZ/components/ui';

const AddNewTicketButton = () => {
	const editorState: EditorState = useEditorModalState();
	const editorId: EditorId = useTicketEditorId('add-new-ticket', 'xyz');

	const onClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		editorState.openEditor(editorId);
	};
	const onClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		editorState.closeEditor(editorId);
	};
	const isOpen = editorState.isEditorOpen(editorId);

	return (
		<>
			<EspressoButton icon={'tickets-alt'} buttonText={'Add New Ticket'} onClick={onClick} />
			<AddNewTicketModal onClose={onClose} isOpen={isOpen} />
		</>
	);
};

export default AddNewTicketButton;
