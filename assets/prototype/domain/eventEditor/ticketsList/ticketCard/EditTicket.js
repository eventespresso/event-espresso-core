import EditTicketButton from './EditTicketButton';
import EditTicketModal from './EditTicketModal';

const EditTicket = ({ position }) => (
	<>
		<EditTicketButton position={position} />
		<EditTicketModal />
	</>
);

export default EditTicket;
