import EditDatetimeButton from './EditDatetimeButton';
import EditDatetimeModal from './EditDatetimeModal';

const EditDatetime = ({ position, relatedTickets }) => (
	<>
		<EditDatetimeButton position={position} />
		<EditDatetimeModal relatedTickets={relatedTickets} />
	</>
);

export default EditDatetime;
