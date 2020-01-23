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
import useRelations from '../../../application/services/apollo/relations/useRelations';

const useEditDatetimeModal: EditorModal = (): EditorModalCallback => {
	const { updateEntity } = useEntityMutator(EntityType.Datetime);
	const tickets = useTickets();
	const { getRelations } = useRelations();
	const { closeEditor } = useEditorModal();

	return useCallback<EditorModalCallback>((entityId) => {
		// get related ticket IDs for this datetime
		const relatedTicketIds = getRelations({
			entity: 'datetimes',
			entityId,
			relation: 'tickets',
		});
		const onSubmit = (fields: any): void => {
			updateEntity({ ...fields, id: entityId });
		};

		const onClose = (): void => {
			closeEditor('editDatetime');
		};

		const formComponent: React.FC<DateItemFormProps> = (props): JSX.Element => (
			// id prop is needed because modal is out of DatetimeContext
			<DateForm
				{...props}
				id={entityId}
				relatedTickets={relatedTicketIds}
				tickets={tickets}
				title='Update datetime'
			/>
		);

		return {
			formComponent,
			onSubmit,
			onClose,
			tickets,
		};
	}, []);
};

export default useEditDatetimeModal;
