import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { FormProps } from 'react-final-form';

import DateForm from './dateForm/DateForm';
import useDateFormConfig from './dateForm/useDateFormConfig';
import { DateItemFormProps } from './types';
import { useEditorModal, EditorModal, ModalClose } from '@appLayout/editorModal';
import { useDatetimeMutator, CreateDatetimeInput } from '@edtrServices/apollo/mutations';
import useEvent from '@edtrServices/apollo/queries/events/useEvent';

const useAddDatetimeModal: EditorModal = () => {
	const { createEntity } = useDatetimeMutator();
	const { closeEditor } = useEditorModal();

	const { name: eventName = '' } = useEvent() || {};

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('addDatetime');
	}, [closeEditor]);

	const onSubmit = useCallback<FormProps<CreateDatetimeInput>['onSubmit']>(
		(fields): void => {
			createEntity(fields);
		},
		[createEntity]
	);

	const formConfig = useDateFormConfig(null, { onSubmit });

	return {
		title: `${eventName}: ${__('New Datetime')}`,
		formConfig,
		onClose,
	};
};

export default useAddDatetimeModal;
