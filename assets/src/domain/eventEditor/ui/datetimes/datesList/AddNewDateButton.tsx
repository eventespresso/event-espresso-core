import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDisclosure } from '@chakra-ui/core';

import { Calendar, Ticket } from '@appDisplay/icons';
import { Button, ButtonSize, ButtonType } from '@application/ui/input';
import { ButtonGroup } from '@infraUI/inputs';
import useTicketAssignmentsManager from '../../ticketAssignmentsManager/useTicketAssignmentsManager';
import { Container as FormContainer } from '@edtrUI/datetimes/dateForm/multiStep';

const AddNewDateButton: React.FC = () => {
	const { ModalContainer, onOpen, ...disclosure } = useTicketAssignmentsManager();
	const { isOpen, onClose, onOpen: onAddNew } = useDisclosure();

	return (
		<>
			<ButtonGroup marginBottom='2rem'>
				<Button
					buttonSize={ButtonSize.BIG}
					buttonText={__('Add New Date')}
					buttonType={ButtonType.ACCENT}
					icon={Calendar}
					mr={2}
					onClick={onAddNew}
				/>
				<Button
					buttonSize={ButtonSize.BIG}
					buttonText={__('Ticket Assignments')}
					buttonType={ButtonType.ACCENT}
					icon={Ticket}
					onClick={onOpen}
				/>
			</ButtonGroup>
			<ModalContainer assignmentType='forAll' {...disclosure} />
			<FormContainer isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AddNewDateButton;
