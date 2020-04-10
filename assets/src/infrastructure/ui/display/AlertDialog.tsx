import React from 'react';
import {
	AlertDialog as ChakraAlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { AlertDialogProps } from './types';

const AlertDialog: React.FC<AlertDialogProps> = ({ buttonProps, onConfirm, title }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const cancelRef = React.useRef();
	const onClose = () => setIsOpen(false);
	const onDelete = () => {
		onClose();
		onConfirm();
	};

	return (
		<>
			<EspressoButton {...buttonProps} onClick={() => setIsOpen(true)} />

			<ChakraAlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay />
				<AlertDialogContent>
					{buttonProps?.tooltip && (
						<AlertDialogHeader fontSize='lg' fontWeight='bold' textTransform='capitalize'>
							{buttonProps.tooltip}
						</AlertDialogHeader>
					)}
					<AlertDialogBody>{title}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							{__('No')}
						</Button>
						<Button variantColor='red' onClick={onDelete} ml={3}>
							{__('Yes')}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</ChakraAlertDialog>
		</>
	);
};

export default AlertDialog;
