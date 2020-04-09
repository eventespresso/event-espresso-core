import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import TicketPriceCalculator from './TicketPriceCalculator';
import useResetButtonProps from '../buttons/useResetButtonProps';
import useSubmitButtonProps from '../buttons/useSubmitButtonProps';
import { useTPCContext } from '../context';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@infraUI/layout/modal';
import { Button } from '@infraUI/inputs';

import './styles.scss';

const TicketPriceCalculatorModal: React.FC = () => {
	const {
		onCloseModal,
		dataState: { reset, prices, ticket },
	} = useTPCContext();
	const resetButton = useResetButtonProps({ reset });
	const submitButton = useSubmitButtonProps({ onCloseModal, prices });

	return (
		<Modal isOpen={true} onClose={onCloseModal} isCentered scrollBehavior='inside' size='xl'>
			<ModalOverlay />
			<ModalContent className='ee-tpc__modal'>
				<ModalHeader>{sprintf(__('Price Calculator for Ticket: %s'), ticket.name)}</ModalHeader>
				<ModalCloseButton />

				<ModalBody className='ee-tpc__body'>
					<TicketPriceCalculator />
				</ModalBody>

				<ModalFooter>
					<Button mr={3} {...resetButton} />
					<Button variantColor='blue' {...submitButton} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default TicketPriceCalculatorModal;
