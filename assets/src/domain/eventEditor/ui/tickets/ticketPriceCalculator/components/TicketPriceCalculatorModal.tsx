import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Modal } from 'antd';

import useResetButtonProps from '../buttons/useResetButtonProps';
import useSubmitButtonProps from '../buttons/useSubmitButtonProps';
import TicketPriceCalculator from './TicketPriceCalculator';
import { useOnSubmitPrices } from '../hooks';
import { useTPCContext } from '../context';

import './styles.scss';

const TicketPriceCalculatorModal: React.FC = () => {
	const {
		onCloseModal,
		dataState: { reset, ticket },
	} = useTPCContext();
	const submitPrices = useOnSubmitPrices();
	const resetButton = useResetButtonProps({ reset });
	const submitButton = useSubmitButtonProps({ onCloseModal, submitPrices });

	return (
		<Modal
			bodyStyle={{ padding: 0 }}
			cancelButtonProps={resetButton}
			cancelText={__('Reset')}
			centered
			maskClosable
			okButtonProps={submitButton}
			okText={__('Submit')}
			onCancel={onCloseModal}
			onOk={onCloseModal}
			title={sprintf(__('Price Calculator for Ticket: %s'), ticket.name)}
			visible={true}
			width={'80%'}
			wrapClassName='ee-tpc-modal'
		>
			<div className='tpc-body'>
				<TicketPriceCalculator />
			</div>
		</Modal>
	);
};

export default TicketPriceCalculatorModal;
