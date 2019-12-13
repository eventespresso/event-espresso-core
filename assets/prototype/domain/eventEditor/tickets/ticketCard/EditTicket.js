import EditTicketButton from './EditTicketButton';
import EditTicketModal from './EditTicketModal';

const EditTicket = ({ position, relatedDates }) => (
	<>
		<EditTicketButton position={position} />
		<EditTicketModal relatedDates={relatedDates} />
	</>
);

export default EditTicket;
