import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import TicketPriceCalculator from './TicketPriceCalculator';
import useResetButtonProps from '../buttons/useResetButtonProps';
import useSubmitButtonProps from '../buttons/useSubmitButtonProps';
import { useTPCContext } from '../context';
import { Modal } from '@infraUI/layout/modal';

import './styles.scss';

const TicketPriceCalculatorModal: React.FC = () => {
	const {
		onClose,
		dataState: { ticket },
	} = useTPCContext();
	const resetButtonProps = useResetButtonProps();
	const submitButtonProps = useSubmitButtonProps();

	return (
		<Modal
			isOpen={true}
			onClose={onClose}
			className='ee-tpc'
			bodyClassName='ee-tpc__body'
			submitButtonProps={submitButtonProps}
			cancelButtonProps={resetButtonProps}
			title={sprintf(__('Price Calculator for Ticket: %s'), ticket.name)}
		>
			<TicketPriceCalculator />
		</Modal>
	);
};

export default TicketPriceCalculatorModal;
