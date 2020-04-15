import React from 'react';
import {
	Modal as ChakraModal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/core';

import { Button } from '@infraUI/inputs';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({
	bodyClassName,
	cancelButtonProps,
	children,
	className,
	closeButton,
	content,
	footerContent,
	isClosable = true,
	scrollBehavior = 'inside',
	submitButtonProps,
	title,
	...props
}) => {
	let footerNode = footerContent;

	if (!footerNode) {
		const cancelButton = cancelButtonProps && <Button mr={3} {...cancelButtonProps} />;
		const submitButton = submitButtonProps && <Button variantColor='blue' {...submitButtonProps} />;

		footerNode = (cancelButton || submitButton) && (
			<>
				{cancelButton}
				{submitButton}
			</>
		);
	}
	return (
		<ChakraModal
			// closeOnEsc={isClosable}
			closeOnOverlayClick={isClosable}
			isCentered
			scrollBehavior={scrollBehavior}
			{...props}
		>
			<ModalOverlay />
			<ModalContent role='alertdialog' className={className}>
				<ModalHeader>{title}</ModalHeader>

				{closeButton ? closeButton : <ModalCloseButton isDisabled={!isClosable} />}

				<ModalBody className={bodyClassName}>{children || content}</ModalBody>

				{footerNode && <ModalFooter>{footerNode}</ModalFooter>}
			</ModalContent>
		</ChakraModal>
	);
};

export default Modal;
