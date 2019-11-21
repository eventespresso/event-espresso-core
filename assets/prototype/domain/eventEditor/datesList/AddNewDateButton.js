import { useState } from '@wordpress/element';
import { Button } from '@blueprintjs/core/lib/esm';
import AddNewDateModal from './AddNewDateModal';

const btnStyle = {
	margin: '0 0 0 1rem'
};

const AddNewDateButton = ({ eventId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<>
			<Button
				icon={'calendar'}
				text={'Add New Date'}
				onClick={handleOpen}
				style={btnStyle}
				large
			/>
			<AddNewDateModal
				eventId={eventId}
				handleClose={handleClose}
				isOpen={isOpen}
			/>
		</>
	);
};

export default AddNewDateButton;
