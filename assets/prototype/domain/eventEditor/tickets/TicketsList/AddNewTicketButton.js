import { useContext } from 'react';

import AddNewTicketModal from './AddNewTicketModal';
import { TicketContext } from '../../context/TicketProvider';
import { EspressoButton } from '../../../../../ZZZ/components/ui';

const AddNewTicketButton = () => {
	const { editorIds, editorState } = useContext(TicketContext);

	const onClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		editorState.openEditor(editorIds.editForm);
	};
	const onClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		editorState.closeEditor(editorIds.editForm);
	};
	const isOpen = editorState.isEditorOpen(editors.editForm);

	return (
		<>
			<EspressoButton icon={'tickets-alt'} buttonText={'Add New Ticket'} onClick={onClick} />
			<AddNewTicketModal onClose={onClose} isOpen={isOpen} />
		</>
	);
};

export default AddNewTicketButton;
