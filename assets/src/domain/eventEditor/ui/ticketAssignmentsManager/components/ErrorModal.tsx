import React from 'react';
import { __ } from '@wordpress/i18n';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/core';

//   import { Modal } from '@infraUI/layout/modal';

interface ErrorMessageProps {
	asAlert?: boolean;
}

const ErrorModal: React.FC<ErrorMessageProps> = ({ isOpen, onClose }) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>sasas</ModalBody>

					<ModalFooter>
						<Button variantColor='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ErrorModal;
