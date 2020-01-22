import React from 'react';
import DateForm from './dateForm/DateForm';
import { useEntityMutator, EntityType } from '../../../application/services/apollo/mutations';
import useTickets from '../data/queries/tickets/useTickets';
import { DateItemFormProps } from './types';
import { EditorModal } from '../../../application/ui/components/layout/eeditorModal';
import useRelations from '../../../application/services/apollo/relations/useRelations';

const useEditDatetimeModal: EditorModal = (entityId) => {
	const { updateEntity } = useEntityMutator(EntityType.Datetime, entityId);
	const onSubmit = (fields: any): void => {
		updateEntity(fields);
	};
	const tickets = useTickets();
	const { getRelations } = useRelations();

	// get related ticket IDs for this datetime
	const relatedTicketIds = getRelations({
		entity: 'datetimes',
		entityId,
		relation: 'tickets',
	});

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
		tickets,
	};
};

export default useEditDatetimeModal;
