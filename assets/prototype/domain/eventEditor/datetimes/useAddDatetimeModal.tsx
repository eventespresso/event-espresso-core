import React, { useCallback } from 'react';
import DateForm from './dateForm/DateForm';
import { useEntityMutator, EntityType } from '../../../application/services/apollo/mutations';
import { DateItemFormProps } from './types';
import {
	useEditorModal,
	EditorModal,
	EditorModalCallback,
} from '../../../application/ui/components/layout/eeditorModal';

const useAddDatetimeModal: EditorModal = () => {
	const { createEntity } = useEntityMutator(EntityType.Datetime);
	const { closeEditor } = useEditorModal();

	return useCallback<EditorModalCallback>(() => {
		const onSubmit = (fields: any): void => {
			createEntity(fields);
		};

		const onClose = (): void => {
			closeEditor('addDatetime');
		};

		const formComponent = (props: DateItemFormProps): JSX.Element => (
			<DateForm {...props} title='New Datetime Details' />
		);
		return {
			formComponent,
			onSubmit,
			onClose,
		};
	}, []);
};

export default useAddDatetimeModal;
