import { useContext } from '@wordpress/element';
import FormModal from '../../../../application/ui/components/forms/FormModal';
import DatetimeForm from '../dateForm/DateForm';
import { DateTimeContext } from '../../context/DateTimeProvider';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useTickets from '../../data/queries/tickets/useTickets';

const EditDateModal = ({ relatedTickets }) => {
	const { id, isOpen, onClose } = useContext(DateTimeContext);
	const { updateEntity } = useEntityMutator(EntityType.Datetime, id);
	const tickets = useTickets();

	const formComponent = (props) => (
		<DatetimeForm {...props} relatedTickets={relatedTickets} tickets={tickets} title='Update date' />
	);
	const onSubmit = (fields) => updateEntity(fields);

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			isOpen={isOpen}
			onSubmit={onSubmit}
			onClose={onClose}
			tickets={tickets}
		/>
	);
};

export default EditDateModal;
