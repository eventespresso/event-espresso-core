import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDisclosure } from '@chakra-ui/core';

import { Ticket } from '@appDisplay/icons';
import { Button } from '@appInputs/index';
import { Container as FormContainer } from '@edtrUI/tickets/ticketForm/multiStep';

const AddNewTicketButton: React.FC = () => {
	const { isOpen, onClose, onOpen: onAddNew } = useDisclosure();

	return (
		<>
			<Button buttonText={__('Add New Ticket')} icon={Ticket} onClick={onAddNew} />
			<FormContainer isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AddNewTicketButton;
