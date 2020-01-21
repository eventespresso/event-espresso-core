import React, { CSSProperties } from 'react';

import AddNewDatetimeModal from './AddNewDateModal';
import useDateEditorId from '../../context/DateTimeProvider/useDateEditorId';
import useEditorModalState from '../../../../application/ui/components/layout/editorModal/useEditorModalState';
import {
	EditorId,
	EditorState,
} from '../../../../application/ui/components/layout/editorModal/useEditorModalState/types';
import { EspressoButton } from '../../../../application/ui/components/input';

const btnRowStyle: CSSProperties = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton: React.FC = (): JSX.Element => {
	const editorState: EditorState = useEditorModalState();
	const editorId: EditorId = useDateEditorId('add-new-date', 'xyz');

	const onClick = (): void => {
		editorState.openEditor(editorId);
	};
	const onClose = (): void => {
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
