import React, { useEffect } from 'react';
import { canUseDOM } from '@appServices/utilities/dom';
import { ESCAPE } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';

import { useConfirmationDialog } from '@appDisplay/confirm';
import { Modal, ModalProps } from '@infraUI/layout/modal';

interface Props extends ModalProps {
	cancelBtnText?: string;
	header?: string;
	okBtnText?: string;
	showAlertOnEscape: boolean;
}

const ModalWithAlert: React.FC<Props> = ({ children, showAlertOnEscape, ...props }) => {
	const title = props.header || __('Are you sure you want to close this?');
	const { confirmationDialog, onOpen } = useConfirmationDialog({
		title,
		onConfirm: props.onClose as VoidFunction,
	});

	const onEscape = ({ keyCode }): void => {
		if (keyCode === ESCAPE) {
			onOpen();
		}
	};

	useEffect(() => {
		if (canUseDOM) {
			document.addEventListener('keydown', onEscape);
		}

		return () => {
			if (canUseDOM) {
				document.removeEventListener('keydown', onEscape);
			}
		};
	}, []);

	return (
		<>
			<Modal {...props} closeOnEsc={!showAlertOnEscape}>
				{children}
			</Modal>
			{showAlertOnEscape && confirmationDialog}
		</>
	);
};

export default ModalWithAlert;
