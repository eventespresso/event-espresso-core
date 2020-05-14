import React from 'react';
import { Modal } from '@chakra-ui/core';
import { ButtonProps } from '@infraUI/inputs';

export interface ModalProps extends React.ComponentProps<typeof Modal> {
	bodyClassName?: string;
	cancelButtonProps?: ButtonProps;
	className?: string;
	closeButton?: React.ReactNode;
	content?: React.ReactNode;
	destroyOnClose?: boolean;
	footerContent?: React.ReactNode;
	isClosable?: boolean;
	submitButtonProps?: ButtonProps;
	title?: React.ReactNode;
}
