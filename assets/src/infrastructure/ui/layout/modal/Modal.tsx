import React from 'react';
import classNames from 'classnames';
import {
	Modal as ChakraModal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/core';

import { Button } from '@application/ui/input';
import { ModalProps } from './types';

import './styles.scss';

const Modal: React.FC<ModalProps> = ({
	cancelButtonProps,
	children,
	closeButton,
	content,
	destroyOnClose = true,
	footerContent,
	isClosable = true,
	isOpen,
	scrollBehavior = 'inside',
	submitButtonProps,
	title,
	...props
}) => {
	if (destroyOnClose && !isOpen) {
		return null;
	}

	const className = classNames(props.className, 'ee-modal');
	const bodyClassName = classNames(props.bodyClassName, 'ee-modal__body');

	const cancelButton = cancelButtonProps && <Button mr={3} {...cancelButtonProps} />;
	const submitButton = submitButtonProps && <Button variantColor='blue' {...submitButtonProps} />;
	const defaultFooterNode = (cancelButton || submitButton) && (
		<>
			{cancelButton}
			{submitButton}
		</>
	);

	const footerNode = footerContent ?? defaultFooterNode;

	return (
		<ChakraModal
			closeOnOverlayClick={isClosable}
			isCentered
			isOpen={isOpen}
			scrollBehavior={scrollBehavior}
			{...props}
		>
			<ModalOverlay />
			<ModalContent role='alertdialog' className={className}>
				<ModalHeader className='ee-modal__header'>{title}</ModalHeader>

				{closeButton ? closeButton : <ModalCloseButton isDisabled={!isClosable} />}

				<ModalBody className={bodyClassName}>{children || content}</ModalBody>

				{footerNode && <ModalFooter>{footerNode}</ModalFooter>}
			</ModalContent>
		</ChakraModal>
	);
};

export default Modal;
