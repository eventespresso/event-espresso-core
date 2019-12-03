import EditDateButton from './EditDateButton';
import EditDateModal from './EditDateModal';

const EditDate = ({ position, relatedTickets, tickets }) => (
	<>
		<EditDateButton position={position} />
		<EditDateModal relatedTickets={relatedTickets} tickets={tickets} />
	</>
);

export default EditDate;
