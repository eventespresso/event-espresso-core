import React from 'react';
import { Modal } from '@chakra-ui/core';
import { ButtonProps } from '@infraUI/inputs';

export interface ModalProps extends React.ComponentProps<typeof Modal> {
	className?: string;
	bodyClassName?: string;
	content?: React.ReactNode;
	title?: React.ReactNode;
	footerContent?: React.ReactNode;
	submitButtonProps?: ButtonProps;
	cancelButtonProps?: ButtonProps;
}
