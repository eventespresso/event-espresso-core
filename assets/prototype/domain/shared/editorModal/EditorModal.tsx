import React from 'react';
import FormModal from '../../../application/ui/components/forms/formModal/FormModal';
import { useEditorModal } from '../../../application/ui/components/layout/eeditorModal';
import useEditors from './useEditors';

const EditorModal: React.FC = (): JSX.Element => {
	const { isOpen, editorId, closeEditor, entityId } = useEditorModal();
	const editors = useEditors(entityId);

	const entitySpecificEditor = editors[editorId];

	if (!isOpen || !entitySpecificEditor) {
		return null;
	}

	const { formComponent, initialValues = {}, onSubmit, onClose = closeEditor, ...rest } = entitySpecificEditor;

	return (
		<FormModal
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
