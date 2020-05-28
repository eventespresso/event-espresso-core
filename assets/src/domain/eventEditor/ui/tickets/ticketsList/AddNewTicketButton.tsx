import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDisclosure } from '@chakra-ui/core';

import { Button, ButtonSize } from '@application/ui/input';
import { Container as FormContainer } from '@edtrUI/tickets/ticketForm/multiStep';
import { Ticket } from '@appDisplay/icons';

const AddNewTicketButton: React.FC = () => {
	const { isOpen, onClose, onOpen: onAddNew } = useDisclosure();

	return (
		<>
			<Button buttonSize={ButtonSize.BIG} buttonText={__('Add New Ticket')} icon={Ticket} onClick={onAddNew} />
			<FormContainer isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AddNewTicketButton;
