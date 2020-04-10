import React from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/core';
import { EspressoButton, EspressoButtonProps } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

interface ConfirmDeleteProps {
	buttonProps: EspressoButtonProps;
	onConfirm: VoidFunction;
	title?: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ buttonProps, onConfirm, ...props }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const cancelRef = React.useRef();
	const onClose = () => setIsOpen(false);
	const onDelete = () => {
		onClose();
		onConfirm();
	};
	const title = props.title || __('Are you sure you want to delete this?');

	return (
		<>
			<EspressoButton {...buttonProps} onClick={() => setIsOpen(true)} />

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
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
			</AlertDialog>
		</>
	);
};

export default ConfirmDelete;
