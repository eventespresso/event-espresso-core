import React, { useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';

// import { TicketAssignmentsManager, ErrorMessage } from './components';
import { ButtonProps } from 'antd/lib/button';
import { ModalFunc } from 'antd/lib/modal/confirm';
import { SaveOutlined } from '@ant-design/icons';
import { TicketPriceCalculatorModalHook } from '../types';
import useModal from '@appLayout/modal/useModal';
import { useTicketItem } from '@edtrServices/apollo/queries';
import TicketPriceCalculator from '../TicketPriceCalculator';
import { withContext } from '../context';
// import { useDataState, useOnSubmitAssignments } from './data';

const useTicketPriceCalculatorModal: TicketPriceCalculatorModalHook = ({ ticketId }) => {
	const modal = useModal();
	// const submitAssignments = useOnSubmitAssignments();
	let currentOpenModal: ReturnType<ModalFunc>;

	const ticket = useTicketItem({ id: ticketId });

	const onSubmit: ButtonProps['onClick'] = useCallback((click) => {
		click.preventDefault();
		destroyModal();
	}, []);

	const submitButton: ButtonProps = {
		htmlType: 'submit',
		icon: <SaveOutlined />,
		onClick: onSubmit,
	};

	const cancelButton: ButtonProps = {
		onClick: (click) => {
			click.preventDefault();
			destroyModal();
		},
	};

	const destroyModal = () => {
		if (currentOpenModal) {
			currentOpenModal.destroy();
		}
	};

	const openModal = () => {
		currentOpenModal = modal.confirm({
			title: sprintf(__('Price Calculator for Ticket: %s'), ticket.name),
			content: withContext(TicketPriceCalculator, { ticketId }),
			okButtonProps: submitButton,
			cancelButtonProps: cancelButton,
			okText: __('Submit'),
			cancelText: __('Cancel'),
			maskClosable: true,
			centered: true,
			width: '80%',
		});
	};

	return {
		openModal,
	};
};

export default useTicketPriceCalculatorModal;
