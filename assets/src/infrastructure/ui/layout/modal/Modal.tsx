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
import { ModalProps } from './types';
import { Button } from '@infraUI/inputs';

const Modal: React.FC<ModalProps> = ({
	bodyClassName,
	cancelButtonProps,
	children,
	className,
	content,
	footerContent,
	isClosable = true,
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
			scrollBehavior='inside'
			size='xl'
			{...props}
		>
			<ModalOverlay />
			<ModalContent className={className}>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton isDisabled={!isClosable} />

				<ModalBody className={bodyClassName}>{children || content}</ModalBody>

				{footerNode && <ModalFooter>{footerNode}</ModalFooter>}
			</ModalContent>
		</ChakraModal>
	);
};

export default Modal;
