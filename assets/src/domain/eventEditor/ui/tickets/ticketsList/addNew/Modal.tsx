import React from 'react';
import { __ } from '@wordpress/i18n';

import { useEvent } from '@edtrServices/apollo/queries/events';
import NewEntityModal from '@sharedUI/NewEntityModal';

import ModalContent from './ModalContent';

type ModalProps = {
	isOpen: boolean;
	onClose: VoidFunction;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	const event = useEvent();
	const title = event?.name ? `${event.name}: ${__('New Ticket Details')}` : __('New Ticket Details');

	return (
		<NewEntityModal isOpen={isOpen} onClose={onClose} title={title}>
			<ModalContent onClose={onClose} />
		</NewEntityModal>
	);
};

export default Modal;
