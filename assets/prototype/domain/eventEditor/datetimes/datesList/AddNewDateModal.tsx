import React from 'react';
import DateForm from '../dateForm/DateForm';
import FormModal from '../../../../application/ui/components/forms/formModal/FormModal';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useTickets from '../../data/queries/tickets/useTickets';
import { AddItemModalProps } from '../../types';
import { DateItemFormProps } from '../types';

const AddNewDateModal: React.FC<AddItemModalProps> = ({ onClose, isOpen }): JSX.Element => {
	const { createEntity } = useEntityMutator(EntityType.Datetime);
	const tickets = useTickets();
	const formComponent = (props: DateItemFormProps): JSX.Element => (
		<DateForm {...props} tickets={tickets} title='New Date Details' />
	);

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			onSubmit={createEntity}
			onClose={onClose}
			isOpen={isOpen}
			tickets={tickets}
		/>
	);
};

export default AddNewDateModal;
