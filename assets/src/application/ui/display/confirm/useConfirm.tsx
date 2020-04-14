import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { AlertDialog } from '@infraUI/display';
import { Button } from '@infraUI/inputs';

import { ConfirmProps } from './types';

// TODO: fix file name and add suport for EspressoIconButton e.g. for TPC delete price button

const Confirm: React.FC<ConfirmProps> = ({ buttonProps, onConfirm, title }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const onDelete = useCallback(() => {
		onConfirm();
		onClose();
	}, [onConfirm]);

	return (
		<>
			<EspressoButton {...buttonProps} onClick={onOpen} />
			<AlertDialog
				cancelButton={<Button buttonText={__('No')} ref={cancelRef} onClick={onClose} />}
				header={buttonProps?.tooltip}
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				okButton={<Button buttonText={__('Yes')} variantColor='red' onClick={onDelete} ml={3} />}
				onClose={onClose}
				title={title}
			/>
		</>
	);
};

export default Confirm;
