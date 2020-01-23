import React from 'react';
import FormModal from '../../../application/ui/components/forms/formModal/FormModal';
import { useEditorModal } from '../../../application/ui/components/layout/eeditorModal';
import useEditors from './useEditors';

const EditorModal: React.FC = (): JSX.Element => {
	const { editors: editorModals } = useEditorModal();
	const editors = useEditors();

	const modals = editorModals.map(({ editorId, entityId, isOpen }) => {
		const entitySpecificEditor = editors[editorId];

		if (!entitySpecificEditor) {
			return null;
		}

		const { formComponent, initialValues = {}, onSubmit, onClose, ...rest } = entitySpecificEditor(entityId);

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
	});
	return <>{modals}</>;
};

export default EditorModal;
