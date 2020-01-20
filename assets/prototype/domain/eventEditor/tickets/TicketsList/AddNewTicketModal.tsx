import React from 'react';

import TicketForm from '../ticketForm/TicketForm';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import { AddItemModalProps } from '../../types';
import { TicketItemFormProps } from '../types';

const AddNewTicketModal: React.FC<AddItemModalProps> = ({ onClose, isOpen }): JSX.Element => {
	const { createEntity } = useEntityMutator(EntityType.Ticket);
	const datetimes = useDatetimes();
	const formComponent = (props: TicketItemFormProps): JSX.Element => (
		<TicketForm {...props} title='New Ticket Details' />
	);

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createEntity}
			onClose={onClose}
			isOpen={isOpen}
			datetimes={datetimes}
		/>
	);
};

export default AddNewTicketModal;
