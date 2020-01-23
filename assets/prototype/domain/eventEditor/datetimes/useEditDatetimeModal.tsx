import React, { useCallback } from 'react';
import DateForm from './dateForm/DateForm';
import { useEntityMutator, EntityType } from '../../../application/services/apollo/mutations';
import { DateItemFormProps } from './types';
import {
	useEditorModal,
	EditorModal,
	EditorModalCallback,
} from '../../../application/ui/components/layout/eeditorModal';

const useEditDatetimeModal: EditorModal = (entityId) => {
	const { updateEntity } = useEntityMutator(EntityType.Datetime, entityId);
	const { closeEditor } = useEditorModal();

	return useCallback<EditorModalCallback>(() => {
		const onSubmit = (fields: any): void => {
			updateEntity({ ...fields });
		};

		const onClose = (): void => {
			closeEditor('editDatetime');
		};

		const formComponent: React.FC<DateItemFormProps> = (props): JSX.Element => (
			// id prop is needed because modal is out of DatetimeContext
			<DateForm {...props} id={entityId} title='Update datetime' />
		);

		return {
			formComponent,
			onSubmit,
			onClose,
		};
	}, [entityId]);
};

export default useEditDatetimeModal;
