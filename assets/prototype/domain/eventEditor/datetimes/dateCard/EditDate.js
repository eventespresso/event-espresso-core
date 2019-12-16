import EditDateButton from './EditDateButton';
import EditDateModal from './EditDateModal';

const EditDate = ({ position, relatedTickets }) => (
	<>
		<EditDateButton position={position} />
		<EditDateModal relatedTickets={relatedTickets} />
	</>
);

export default EditDate;
