import React from 'react';
import {
	AlertDialog as ChakraAlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/core';

import { AlertDialogProps } from './types';

const AlertDialog: React.FC<AlertDialogProps> = ({
	cancelButton,
	header,
	isOpen,
	leastDestructiveRef,
	onClose,
	okButton,
	title,
}) => {
	return (
		<>
			<ChakraAlertDialog isOpen={isOpen} leastDestructiveRef={leastDestructiveRef} onClose={onClose}>
				<AlertDialogOverlay />
				<AlertDialogContent>
					{header && (
						<AlertDialogHeader fontSize='lg' fontWeight='bold' textTransform='capitalize'>
							{header}
						</AlertDialogHeader>
					)}
					<AlertDialogBody>{title}</AlertDialogBody>
					<AlertDialogFooter>
						{cancelButton}
						{okButton}
					</AlertDialogFooter>
				</AlertDialogContent>
			</ChakraAlertDialog>
		</>
	);
};

export default AlertDialog;
