import React from 'react';
import { __ } from '@wordpress/i18n';

import { Modal } from '@infraUI/layout/modal';
import { EntityEditModalProps } from './types';

const EntityEditModal: React.FC<EntityEditModalProps> = ({ isOpen, onClose, title, children }) => {
	return (
		<Modal
			bodyClassName='ee-modal-form__body'
			className='ee-modal-form'
			isOpen={isOpen}
			onClose={onClose}
			title={title}
		>
			{children}
		</Modal>
	);
};

export default EntityEditModal;
