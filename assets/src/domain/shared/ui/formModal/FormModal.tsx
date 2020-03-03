import React from 'react';
import { pathOr } from 'ramda';
import { ModalForm } from '@application/ui/forms/modalForm';
import { useFormModal, EditorState } from '@appLayout/formModal';
import useEditors from './useEditors';

const DEFAULT_EDITOR: EditorState = { editorId: null, entityId: '', isOpen: false };

const FormModal: React.FC = () => {
	const { editors: editorModals } = useFormModal();
	const { editorId, entityId = '', entityDbId = 0, isOpen } = pathOr<EditorState>(
		DEFAULT_EDITOR,
		[editorModals.length - 1],
		editorModals
	);
	// get array of editors
	const editors = useEditors({ entityId, entityDbId });
	const editorProps = editors[editorId];
	if (!editorId || !editorProps) {
		return null;
	}

	const { formComponent, initialValues = {}, onSubmit, onClose, ...rest } = editorProps;
	return (
		editorId && (
			<ModalForm
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

export default FormModal;
