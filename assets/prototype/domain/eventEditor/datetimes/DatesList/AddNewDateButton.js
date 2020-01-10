import { useContext } from 'react';

import AddNewDatetimeModal from './AddNewDateModal';
import useDateEditorId from './useDateEditorId';
import { DateTimeContext } from '../../context/DateTimeProvider';
import { EspressoButton } from '../../../../../ZZZ/components/ui';

const btnRowStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton = () => {
	const { editors, editorState } = useContext(DateTimeContext);

	const onClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		editorState.openEditor(editors.editForm);
	};
	const onClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		editorState.closeEditor(editors.editForm);
	};

	const isOpen = editorState.isEditorOpen(editors.editForm);

	return (
		<div style={btnRowStyle}>
			<EspressoButton icon={'calendar'} buttonText={'Add New Date'} onClick={onClick} />
			<AddNewDatetimeModal onClose={onClose} isOpen={isOpen} />
		</div>
	);
};

export default AddNewDateButton;
