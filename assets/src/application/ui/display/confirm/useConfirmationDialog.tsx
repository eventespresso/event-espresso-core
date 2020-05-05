import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';
import { ConfirmProps } from './types';

const useConfirmationDialog = ({ confirmText, onConfirm, title, ...props }: ConfirmProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const onClickHandler = useCallback(() => {
		if (typeof onConfirm === 'function') {
			onConfirm();
		}
		onClose();
	}, [onConfirm]);

	const noButtonText = props.noButtonText || __('No');
	const yesButtonText = props.yesButtonText || __('Yes');

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
