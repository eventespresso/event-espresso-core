import React, { useCallback, useEffect, useMemo } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';
import { canUseDOM } from 'exenv';
import { ESCAPE } from '@wordpress/keycodes';

import { ButtonProps } from '@infraUI/inputs';
import { AlertDialog } from '@infraUI/display';
import { Button as ButtonAdapter } from '@infraUI/inputs';
import { Modal, ModalProps } from '@infraUI/layout/modal';

interface Props extends ModalProps {
	showAlertOnEscape: boolean;
}

const ModalWithAlert: React.FC<Props> = ({ children, showAlertOnEscape, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const onEscape = ({ keyCode }) => keyCode === ESCAPE && onOpen();

	useEffect(() => {
		canUseDOM && document.addEventListener('keydown', onEscape);

		return () => {
			canUseDOM && document.removeEventListener('keydown', onEscape);
		};
	}, []);

	return (
		<>
			<Modal {...props} closeOnEsc={!showAlertOnEscape}>
				{children}
			</Modal>
			{showAlertOnEscape && (
				<AlertDialog
					cancelButton={<ButtonAdapter buttonText={__('No')} ref={cancelRef} onClick={onClose} />}
					header={__('Are you sure you want to close this modal?')}
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					okButton={
						<ButtonAdapter buttonText={__('Yes')} variantColor='red' onClick={props.onClose} ml={3} />
					}
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default ModalWithAlert;
