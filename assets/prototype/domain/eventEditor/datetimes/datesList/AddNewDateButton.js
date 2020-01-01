import { useState } from '@wordpress/element';
import AddNewDateModal from './AddNewDateModal';
import { EspressoButton } from '../../../../../ZZZ/components/ui';

const btnRowStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton = () => {
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
		<div style={btnRowStyle}>
			<EspressoButton icon={'calendar'} buttonText={'Add New Date'} onClick={handleOpen} />
			<AddNewDateModal handleClose={handleClose} isOpen={isOpen} />
		</div>
	);
};

export default AddNewDateButton;
