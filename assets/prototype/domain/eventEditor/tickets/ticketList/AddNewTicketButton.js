import { useState } from '@wordpress/element';
import AddNewTicketModal from './AddNewTicketModal';
import { EspressoButton } from '../../../../../ZZZ/components/ui';

const AddNewTicketButton = () => {
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
			<EspressoButton icon={'tickets-alt'} buttonText={'Add New Ticket'} onClick={handleOpen} />
			<AddNewTicketModal handleClose={handleClose} isOpen={isOpen} />
		</>
	);
};

export default AddNewTicketButton;
