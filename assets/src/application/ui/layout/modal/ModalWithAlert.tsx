import React, { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';
import { canUseDOM } from '@appServices/utilities/dom';
import { ESCAPE } from '@wordpress/keycodes';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';
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
	const cancelButton = <Button buttonText={cancelBtnText} ref={cancelRef} onClick={onClose} />;
	const header = props.header || __('Are you sure you want to close this?');
	const okBtnText = props.okBtnText || __('Yes');
	const okButton = <Button buttonText={okBtnText} buttonType={ButtonType.ACCENT} onClick={props.onClose} ml={3} />;
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
					cancelButton={cancelButton}
					header={header}
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					okButton={okButton}
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default ModalWithAlert;
