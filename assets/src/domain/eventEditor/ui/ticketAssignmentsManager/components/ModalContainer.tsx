import React from 'react';
import { sprintf, __ } from '@wordpress/i18n';

import { TicketAssignmentsManagerModal } from '../components';
import { ModalContainerProps } from '../types';
import { withContext } from '../context';

const ModalContainer: React.FC<ModalContainerProps> = ({ isOpen, onClose, ...props }) => {
	const { assignmentType, entity } = props;

	let title = '';
	if (assignmentType === 'forDate') {
		title = sprintf(__('Ticket Assignment Manager for Datetime: %s - %s'), `${entity.dbId}`, entity.name);
	} else if (assignmentType === 'forTicket') {
		title = sprintf(__('Ticket Assignment Manager for Ticket: %s - %s'), `${entity.dbId}`, entity.name);
	}

	return (
		isOpen &&
		withContext(
			TicketAssignmentsManagerModal,
			{ ...props, title, onCloseModal: onClose },
			{ title, onCloseModal: onClose }
		)
	);
};

export default ModalContainer;
