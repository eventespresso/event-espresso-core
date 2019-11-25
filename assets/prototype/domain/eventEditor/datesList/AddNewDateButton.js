import { useState } from '@wordpress/element';
import AddNewDateModal from './AddNewDateModal';
import { EspressoButton } from '../../../../ZZZ/components/ui';

const AddNewDateButton = ({ eventId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(true);
	};
	const handleClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
	};

	return (
		<>
			<EspressoButton
				icon={'calendar'}
				buttonText={'Add New Date'}
				onClick={handleOpen}
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
