import React from 'react';
import { __ } from '@wordpress/i18n';

import { Alert } from '@infraUI/display';
import { ButtonProps } from '@infraUI/inputs';
import { Modal } from '@infraUI/layout/modal';

import useErrorMessage from './useErrorMessage';

interface ErrorMessageProps {
	isOpen?: boolean;
	onClose: VoidFunction;
}

const ErrorModal: React.FC<ErrorMessageProps> = ({ isOpen, onClose }) => {
	const errorMessage = useErrorMessage();
	const submitButtonProps: ButtonProps = {
		buttonText: __('Ok'),
		onClick: onClose,
		type: 'submit',
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' submitButtonProps={submitButtonProps}>
			<Alert description={errorMessage} marginTop='1rem' status='error' title={__('Error')} />
		</Modal>
	);
};

export default ErrorModal;
