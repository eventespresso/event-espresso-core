import React from 'react';

import AddNewDatetimeModal from './AddNewDateModal';
import useDateEditorId from '../../context/DateTimeProvider/useDateEditorId';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import {
	EditorId,
	EditorState,
} from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';
import { EspressoButton } from '../../../../../ZZZ/components/ui';

const btnRowStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton = () => {
	const editorState: EditorState = useEditorModalState();
	const editorId: EditorId = useDateEditorId('add-new-date', 'xyz');

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
		<div style={btnRowStyle}>
			<EspressoButton icon={'calendar'} buttonText={'Add New Date'} onClick={onClick} />
			<AddNewDatetimeModal onClose={onClose} isOpen={isOpen} />
		</div>
	);
};

export default AddNewDateButton;
