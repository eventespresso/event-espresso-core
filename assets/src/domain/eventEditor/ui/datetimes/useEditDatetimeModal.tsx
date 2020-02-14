import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import DateForm from './dateForm/DateForm';
import { DateItemFormProps } from './types';
import { useEditorModal, EditorModal, ModalSubmit, ModalClose } from '../../../../application/ui/layout/editorModal';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const useEditDatetimeModal: EditorModal = (entityId) => {
	const { updateEntity } = useDatetimeMutator(entityId);
	const { closeEditor } = useEditorModal();

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('editDatetime');
	}, [closeEditor]);

	const onSubmit = useCallback<ModalSubmit>(
		(fields: any): void => {
			updateEntity({ ...fields });
		},
		[updateEntity]
	);

	const formComponent = useCallback<React.FC<DateItemFormProps>>(
		(props) => (
			// id prop is needed because modal is out of DatetimeContext
			<DateForm {...props} id={entityId} title={__('Update datetime')} />
		),
		[entityId]
	);

	return {
		formComponent,
		onSubmit,
		onClose,
	};
};

export default useEditDatetimeModal;
