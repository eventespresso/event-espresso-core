import EditDateButton from './EditDateButton';
import EditDateModal from './EditDateModal';

const EditDate = ({ position }) => (
	<>
		<EditDateButton position={position} />
		<EditDateModal />
	</>
);

export default EditDate;
