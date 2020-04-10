import React, { useCallback, useMemo } from 'react';
import { Button, useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { AlertDialog } from '@infraUI/display';

import { ConfirmProps } from './types';

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
				cancelButton={
					<Button ref={cancelRef} onClick={onClose}>
						{__('No')}
					</Button>
				}
				header={buttonProps?.tooltip}
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				okButton={
					<Button variantColor='red' onClick={onDelete} ml={3}>
						{__('Yes')}
					</Button>
				}
				onClose={onClose}
				title={title}
			/>
		</>
	);
};

export default Confirm;
