import React from 'react';
import { __ } from '@wordpress/i18n';

import { ModalWithAlert } from '@appLayout/modal';

import CloseModalButton from './buttons/CloseModal';
import TicketAssignmentsManager from '../TicketAssignmentsManager';
import useCancelButtonProps from './buttons/useCancelButtonProps';
import useSubmitButtonProps from './buttons/useSubmitButtonProps';
import { useTAMContext } from '../../context';

import '../styles.scss';

const TicketAssignmentsManagerModal: React.FC = () => {
	const {
		dataState: { hasOrphanEntities },
		onCloseModal,
		title,
	} = useTAMContext();
	const cancelButtonProps = useCancelButtonProps();
	const submitButtonProps = useSubmitButtonProps();

	const hasErrors = hasOrphanEntities();

	return (
		<ModalWithAlert
			bodyClassName='ee-ticket-assignments-manager__body'
			cancelButtonProps={cancelButtonProps}
			className='ee-ticket-assignments-manager'
			closeButton={<CloseModalButton />}
			isOpen={true}
			onClose={onCloseModal}
			showAlertOnEscape={hasErrors}
			submitButtonProps={submitButtonProps}
			title={title || __('Ticket Assignment Manager')}
		>
			<TicketAssignmentsManager />
		</ModalWithAlert>
	);
};

export default TicketAssignmentsManagerModal;
