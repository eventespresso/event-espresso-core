import React, { useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ButtonProps } from 'antd/lib/button';
import { SaveOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import TicketPriceCalculator from './TicketPriceCalculator';
import { useTPCContext } from '../context';
import { useOnSubmitPrices } from '../hooks';

import './styles.scss';

const TicketPriceCalculatorModal: React.FC = () => {
	const {
		onCloseModal,
		dataState: { ticket, reset },
	} = useTPCContext();

	const submitPrices = useOnSubmitPrices();

	const submitButton: ButtonProps = {
		htmlType: 'submit',
		icon: <SaveOutlined />,
		onClick: useCallback(
			(click) => {
				click.preventDefault();
				submitPrices();
				onCloseModal();
			},
			[onCloseModal, submitPrices]
		),
	};

	const resetButton: ButtonProps = {
		htmlType: 'reset',
		onClick: useCallback(
			(click) => {
				click.preventDefault();
				reset();
			},
			[reset]
		),
	};

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
