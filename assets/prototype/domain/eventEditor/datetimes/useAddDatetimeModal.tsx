import React, { useCallback } from 'react';
import DateForm from './dateForm/DateForm';
import { useEntityMutator, EntityType } from '../../../application/services/apollo/mutations';
import useTickets from '../data/queries/tickets/useTickets';
import { DateItemFormProps } from './types';
import {
	useEditorModal,
	EditorModal,
	EditorModalCallback,
} from '../../../application/ui/components/layout/eeditorModal';

const useAddDatetimeModal: EditorModal = (): EditorModalCallback => {
	const { createEntity } = useEntityMutator(EntityType.Datetime);
	const tickets = useTickets();
	const { closeEditor } = useEditorModal();

	return useCallback<EditorModalCallback>(() => {
		const onSubmit = (fields: any): void => {
			createEntity(fields);
		};

		const onClose = (): void => {
			closeEditor('addDatetime');
		};

		const formComponent = (props: DateItemFormProps): JSX.Element => (
			<DateForm {...props} tickets={tickets} title='New Datetime Details' />
		);
		return {
			formComponent,
			onSubmit,
			onClose,
			tickets,
		};
	}, []);
};

export default useAddDatetimeModal;
