import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import DateForm from './dateForm/DateForm';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import { DateItemFormProps } from './types';
import { useEditorModal, EditorModal, ModalSubmit, ModalClose } from '../../../../application/ui/layout/editorModal';

const useAddDatetimeModal: EditorModal = () => {
	const { createEntity } = useEntityMutator(EntityType.Datetime);
	const { closeEditor } = useEditorModal();

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('addDatetime');
	}, [closeEditor]);

	const onSubmit = useCallback<ModalSubmit>(
		(fields: any): void => {
			createEntity(fields);
		},
		[createEntity]
	);

	const formComponent = useCallback<React.FC<DateItemFormProps>>(
		(props): JSX.Element => <DateForm {...props} title={__('New Datetime Details')} />,
		[]
	);

	return {
		formComponent,
		onSubmit,
		onClose,
	};
};

export default useAddDatetimeModal;
