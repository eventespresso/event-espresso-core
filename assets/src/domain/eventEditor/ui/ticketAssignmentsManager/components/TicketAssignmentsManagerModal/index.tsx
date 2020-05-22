import React from 'react';
import { __ } from '@wordpress/i18n';

import { ModalWithAlert } from '@appLayout/modal';

import CloseModalButton from './buttons/CloseModal';
import TicketAssignmentsManager from '../TicketAssignmentsManager';
import useCancelButtonProps from './buttons/useCancelButtonProps';
import useSubmitButtonProps from './buttons/useSubmitButtonProps';
import { useDataState } from '../../data';
import { WithContextProps } from '../../context/types';

import '../styles.scss';

const TicketAssignmentsManagerModal: React.FC<Partial<WithContextProps>> = ({ onCloseModal, title }) => {
	const { hasOrphanEntities } = useDataState();
	const cancelButtonProps = useCancelButtonProps(onCloseModal);
	const submitButtonProps = useSubmitButtonProps(onCloseModal);

	const hasErrors = hasOrphanEntities();
	const closeButton = <CloseModalButton />;

	return (
		<ModalWithAlert
			bodyClassName='ee-ticket-assignments-manager__body'
			cancelButtonProps={cancelButtonProps}
			className='ee-ticket-assignments-manager'
			closeButton={closeButton}
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
