import React from 'react';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/core';

export interface ModalProps extends React.ComponentProps<typeof Modal> {}

export interface ModalBodyProps extends React.ComponentProps<typeof ModalBody> {}

export interface ModalCloseButtonProps extends React.ComponentProps<typeof ModalCloseButton> {}

export interface ModalContentProps extends React.ComponentProps<typeof ModalContent> {}

export interface ModalFooterProps extends React.ComponentProps<typeof ModalFooter> {}

export interface ModalHeaderProps extends React.ComponentProps<typeof ModalHeader> {}

export interface ModalOverlayProps extends React.ComponentProps<typeof ModalOverlay> {}
