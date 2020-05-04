import React, { useCallback, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';
import { ConfirmProps } from './types';

const useConfirm: React.FC<ConfirmProps> = ({ buttonProps, onConfirm, title }) => {
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
			<Button {...buttonProps} onClick={onOpen} />

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
