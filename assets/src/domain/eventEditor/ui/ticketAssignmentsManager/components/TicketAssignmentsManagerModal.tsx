import React from 'react';
import { __ } from '@wordpress/i18n';

import TicketAssignmentsManager from './TicketAssignmentsManager';
import useCancelButtonProps from '../buttons/useCancelButtonProps';
import useSubmitButtonProps from '../buttons/useSubmitButtonProps';
import { useTAMContext } from '../context';
import { Modal } from '@infraUI/layout/modal';

import './styles.scss';

const TicketAssignmentsManagerModal: React.FC = () => {
	const { onCloseModal, title } = useTAMContext();
	const cancelButtonProps = useCancelButtonProps();
	const submitButtonProps = useSubmitButtonProps();

	return (
		<Modal
			bodyClassName='ee-ticket-assignments-manager__body'
			cancelButtonProps={cancelButtonProps}
			className='ee-ticket-assignments-manager'
			isClosable={!submitButtonProps.isDisabled}
			isOpen={true}
			onClose={onCloseModal}
			submitButtonProps={submitButtonProps}
			title={title || __('Ticket Assignment Manager')}
		>
			<TicketAssignmentsManager />
		</Modal>
	);
};

export default TicketAssignmentsManagerModal;
