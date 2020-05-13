import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDisclosure } from '@chakra-ui/core';

import { Ticket } from '@appDisplay/icons';
import { Button } from '@appInputs/index';
import AddNewDateModal from './addNew/Modal';

const AddNewTicketButton: React.FC = () => {
	const { isOpen, onClose, onOpen: onAddNew } = useDisclosure();

	return (
		<>
			<Button buttonText={ __('Add New Ticket') } icon={ Ticket } onClick={ onAddNew } />
			<AddNewDateModal isOpen={ isOpen } onClose={ onClose } />
		</>
	);
};

export default AddNewTicketButton;
