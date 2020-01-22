import React from 'react';
import DateForm from './dateForm/DateForm';
import { useEntityMutator, EntityType } from '../../../application/services/apollo/mutations';
import useTickets from '../data/queries/tickets/useTickets';
import { DateItemFormProps } from './types';
import { EditorModal } from '../../../application/ui/components/layout/eeditorModal';

const useAddDatetimeModal: EditorModal = () => {
	const { createEntity } = useEntityMutator(EntityType.Datetime);
	const tickets = useTickets();
	const onSubmit = (fields: any): void => {
		createEntity(fields);
	};
	const formComponent = (props: DateItemFormProps): JSX.Element => (
		<DateForm {...props} tickets={tickets} title='New Datetime Details' />
	);
	return {
		formComponent,
		onSubmit,
		tickets,
	};
};

export default useAddDatetimeModal;
