import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { AlertDialog } from '@infraUI/display';
import { Button as ButtonAdapter } from '@infraUI/inputs';

import { ConfirmProps } from './types';

const useConfirm: React.FC<ConfirmProps> = ({ children, buttonProps, onConfirm, title }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const onDelete = useCallback(() => {
		if (typeof onConfirm === 'function') {
			onConfirm();
		}
		onClose();
	}, [onConfirm]);

	return (
		<>
			<Button {...buttonProps} onClick={onOpen} />

			<AlertDialog
				cancelButton={<ButtonAdapter buttonText={__('No')} ref={cancelRef} onClick={onClose} />}
				header={buttonProps?.tooltip}
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				okButton={<ButtonAdapter buttonText={__('Yes')} variantColor='red' onClick={onDelete} ml={3} />}
				onClose={onClose}
				title={title}
			/>
		</>
	);
};

export default useConfirm;
