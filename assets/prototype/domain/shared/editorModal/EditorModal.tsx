import React from 'react';
import { pathOr } from 'ramda';
import FormModal from '../../../application/ui/components/forms/formModal/FormModal';
import { useEditorModal, EditorState } from '../../../application/ui/components/layout/eeditorModal';
import useEditors from './useEditors';

const DEFAULT_EDITOR: EditorState = { editorId: null, entityId: '', isOpen: false };

const EditorModal: React.FC = (): JSX.Element => {
	const { editors: editorModals } = useEditorModal();
	const { editorId, entityId = '', isOpen } = pathOr<EditorState>(
		DEFAULT_EDITOR,
		[editorModals.length - 1],
		editorModals
	);
	const editors = useEditors(entityId);

	const entitySpecificEditor = editors[editorId];

	if (!entitySpecificEditor) {
		return null;
	}

	const { formComponent, initialValues = {}, onSubmit, onClose, ...rest } = entitySpecificEditor();
	return (
		<FormModal
			key={editorId + entityId}
			FormComponent={formComponent}
			initialValues={initialValues}
			isOpen={isOpen}
			onSubmit={onSubmit}
			onClose={onClose}
			{...rest}
		/>
	);
};

export default EditorModal;
