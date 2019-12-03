import EditTicketButton from './EditTicketButton';
import EditTicketModal from './EditTicketModal';

const EditTicket = ({ datetimes, position, relatedDates }) => (
	<>
		<EditTicketButton position={position} />
		<EditTicketModal datetimes={datetimes} relatedDates={relatedDates} />
	</>
);

export default EditTicket;
