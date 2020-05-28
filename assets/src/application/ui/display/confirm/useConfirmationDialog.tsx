import React, { useCallback, useMemo } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';
import { ConfirmProps } from './types';

const useConfirmationDialog = ({ message, onConfirm, title, ...props }: ConfirmProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const onClickHandler = useCallback(() => {
		if (typeof onConfirm === 'function') {
			onConfirm();
		}
		onClose();
	}, [onClose, onConfirm]);

	const noButtonText = props.noButtonText || __('No');
	const yesButtonText = props.yesButtonText || __('Yes');

	const cancelButton = <Button buttonText={noButtonText} ref={cancelRef} onClick={onClose} />;

	const okButton = (
		<Button buttonText={yesButtonText} buttonType={ButtonType.ACCENT} onClick={onClickHandler} ml={3} />
	);

	const confirmationDialog = (
		<AlertDialog
			cancelButton={cancelButton}
			header={title}
			body={message}
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			okButton={okButton}
			onClose={onClose}
		/>
	);

	return useMemo(
		() => ({
			confirmationDialog,
			onOpen,
		}),
		[confirmationDialog, onOpen]
	);
};

export default useConfirmationDialog;
