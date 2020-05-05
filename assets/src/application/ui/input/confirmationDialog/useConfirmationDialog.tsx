import React, { useCallback, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';

const useConfirmationDialog = ({ confirmText, onConfirm, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	const noButtonText = props.noButtonText || __('No');
	const yesButtonText = props.yesButtonText || __('Yes');

	const onClickHandler = useCallback(() => {
		if (typeof onConfirm === 'function') {
			onConfirm();
		}
		onClose();
	}, []);

	const cancelButton = <Button buttonText={noButtonText} ref={cancelRef} onClick={onClose} />;

	const okButton = (
		<Button buttonText={yesButtonText} buttonType={ButtonType.ACCENT} onClick={onClickHandler} ml={3} />
	);

	const confirmationDialog = (
		<AlertDialog
			cancelButton={cancelButton}
			header={confirmText}
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			okButton={okButton}
			onClose={onClose}
		/>
	);

	return {
		confirmationDialog,
		onOpen,
	};
};

export default useConfirmationDialog;
