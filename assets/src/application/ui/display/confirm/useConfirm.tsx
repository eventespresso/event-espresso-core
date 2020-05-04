import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { ButtonType } from '@appInputs/Button';
import { Button } from '@application/ui/input';
import { Button as ButtonAdapter } from '@infraUI/inputs';
import { DropdownMenuItem } from '@application/ui/layout/dropdownMenu';

import { ConfirmProps } from './types';

const useConfirm: React.FC<ConfirmProps> = ({ buttonProps, dropdownMenuProps, onConfirm, title }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const onClickHandler = useCallback(() => {
		if (typeof onConfirm === 'function') {
			onConfirm();
		}
		onClose();
	}, [onConfirm]);

	return (
		<>
			{buttonProps && <Button {...buttonProps} onClick={onOpen} />}

			{dropdownMenuProps && <DropdownMenuItem {...dropdownMenuProps} onClick={onOpen} />}

			<AlertDialog
				cancelButton={<Button buttonText={__('No')} ref={cancelRef} onClick={onClose} />}
				header={buttonProps?.tooltip}
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				okButton={
					<Button buttonText={__('Yes')} buttonType={ButtonType.ACCENT} onClick={onClickHandler} ml={3} />
				}
				onClose={onClose}
				title={title}
			/>
		</>
	);
};

export default useConfirm;
