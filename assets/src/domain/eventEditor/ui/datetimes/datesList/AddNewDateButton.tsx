import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';

import { Calendar, Ticket } from '@appDisplay/icons';
import { Button } from '@application/ui/input';
import { useFormModal } from '@appLayout/formModal';
import useTicketAssignmentsManager from '../../ticketAssignmentsManager/useTicketAssignmentsManager';

const btnRowStyle: CSSProperties = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton: React.FC = () => {
	const { openEditor } = useFormModal();
	const { ModalContainer, onOpen, ...disclosure } = useTicketAssignmentsManager();

	const onClickAddNew = (): void => {
		openEditor({
			editorId: 'addDatetime',
		});
	};

	return (
		<div style={btnRowStyle}>
			<Button buttonText={__('Add New Date')} icon={Calendar} mr={2} onClick={onClickAddNew} variant='outline' />
			<Button buttonText={__('Ticket Assignments')} icon={Ticket} onClick={onOpen} variant='outline' />
			<ModalContainer assignmentType='forAll' {...disclosure} />
		</div>
	);
};

export default AddNewDateButton;
