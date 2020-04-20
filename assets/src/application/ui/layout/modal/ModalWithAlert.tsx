import React, { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';
import { canUseDOM } from '@appServices/utilities/dom';
import { ESCAPE } from '@wordpress/keycodes';

import { AlertDialog } from '@infraUI/display';
import { Button as ButtonAdapter } from '@infraUI/inputs';
import { Modal, ModalProps } from '@infraUI/layout/modal';

interface Props extends ModalProps {
	cancelBtnText?: string;
	header?: string;
	okBtnText?: string;
	showAlertOnEscape: boolean;
}

const ModalWithAlert: React.FC<Props> = ({ children, showAlertOnEscape, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const cancelBtnText = props.cancelBtnText || __('No');
	const header = props.header || __('Are you sure you want to close this?');
	const okBtnText = props.okBtnText || __('Yes');
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
			{showAlertOnEscape && (
				<AlertDialog
					cancelButton={<ButtonAdapter buttonText={cancelBtnText} ref={cancelRef} onClick={onClose} />}
					header={header}
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					okButton={
						<ButtonAdapter buttonText={okBtnText} variantColor='red' onClick={props.onClose} ml={3} />
					}
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default ModalWithAlert;
