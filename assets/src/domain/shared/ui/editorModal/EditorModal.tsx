import React from 'react';
import { pathOr } from 'ramda';
import FormModal from '../../../../application/ui/forms/formModal/FormModal';
import { useEditorModal, EditorState } from '../../../../application/ui/layout/editorModal';
import useEditors from './useEditors';

const DEFAULT_EDITOR: EditorState = { editorId: null, entityId: '', isOpen: false };

const EditorModal: React.FC = (): JSX.Element => {
	const { editors: editorModals } = useEditorModal();
	const { editorId, entityId = '', isOpen } = pathOr<EditorState>(
		DEFAULT_EDITOR,
		[editorModals.length - 1],
		editorModals
	);
	// get array of editors
	const editors = useEditors(entityId);
	const editorProps = editors[editorId];
	if (!editorId || !editorProps) {
		return null;
	}

	const { formComponent, initialValues = {}, onSubmit, onClose, ...rest } = editorProps;
	return (
		editorId && (
			<FormModal
				key={editorId + entityId}
				FormComponent={formComponent}
				initialValues={initialValues}
				isOpen={isOpen}
				onSubmit={onSubmit}
				onClose={onClose}
				{...rest}
			/>
		)
	);
};

export default EditorModal;
