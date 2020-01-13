import React from 'react';

import AddNewDatetimeModal from './AddNewDateModal';
import useDateEditorId from '../../context/DateTimeProvider/useDateEditorId';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import {
	EditorId,
	EditorState,
} from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';
import { ClickEvent, EspressoButton } from '../../../../application/ui/components/input';

const btnRowStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton: React.FunctionComponent = () => {
	const editorState: EditorState = useEditorModalState();
	const editorId: EditorId = useDateEditorId('add-new-date', 'xyz');

	const onClick: ClickEvent = (click) => {
		click.preventDefault();
		click.stopPropagation();
		editorState.openEditor(editorId);
	};
	const onClose: ClickEvent = (click) => {
		click.preventDefault();
		click.stopPropagation();
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
