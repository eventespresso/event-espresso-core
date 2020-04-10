import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
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
			<EspressoButton icon={Icon.CALENDAR} buttonText={__('Add New Date')} onClick={onClickAddNew} />
			<EspressoButton icon={Icon.TICKET} buttonText={__('Ticket Assignments')} onClick={onOpen} />
			<ModalContainer assignmentType='forAll' {...disclosure} />
		</div>
	);
};

export default AddNewDateButton;
