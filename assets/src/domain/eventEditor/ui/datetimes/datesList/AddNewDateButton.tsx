import React from 'react';
import { __ } from '@wordpress/i18n';

import { Calendar, Ticket } from '@appDisplay/icons';
import { Button } from '@application/ui/input';
import { ButtonGroup } from '@infraUI/inputs';
import { useFormModal } from '@appLayout/formModal';
import useTicketAssignmentsManager from '../../ticketAssignmentsManager/useTicketAssignmentsManager';

const AddNewDateButton: React.FC = () => {
	const { openEditor } = useFormModal();
	const { ModalContainer, onOpen, ...disclosure } = useTicketAssignmentsManager();

	const onClickAddNew = (): void => {
		openEditor({
			editorId: 'addDatetime',
		});
	};

	return (
		<>
			<ButtonGroup marginBottom='2rem'>
				<Button buttonText={__('Default')} />
				<Button buttonText={__('Add New Date')} icon={Calendar} mr={2} onClick={onClickAddNew} />
				<Button buttonText={__('Ticket Assignments')} icon={Ticket} onClick={onOpen} />
			</ButtonGroup>
			<ModalContainer assignmentType='forAll' {...disclosure} />
		</>
	);
};

export default AddNewDateButton;
