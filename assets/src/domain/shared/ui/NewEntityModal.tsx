import React from 'react';
import { __ } from '@wordpress/i18n';

import { Modal as ModalAdapter } from '@infraUI/layout/modal';

type NewEntityModalProps = {
	isOpen: boolean;
	onClose: VoidFunction;
	title?: string;
};

const NewEntityModal: React.FC<NewEntityModalProps> = ({ isOpen, onClose, title, children }) => {
	return (
		<ModalAdapter
			bodyClassName='ee-modal-form__body'
			className='ee-modal-form'
			isOpen={isOpen}
			onClose={onClose}
			title={title}
		>
			{children}
		</ModalAdapter>
	);
};

export default NewEntityModal;
