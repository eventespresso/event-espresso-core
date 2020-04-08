import React, { useEffect, useCallback } from 'react';
import { sprintf, __ } from '@wordpress/i18n';
import { TicketAssignmentsManager, ErrorMessage } from '../components';
import { ButtonProps } from 'antd/lib/button';
import { ModalFunc } from 'antd/lib/modal/confirm';
import { SaveOutlined } from '@ant-design/icons';
import { BaseProps, TicketAssignmentsManager as TAM } from '../types';
import useModal from '@appLayout/modal/useModal';
import { withContext } from '../context';
import { useDataState, useOnSubmitAssignments } from '../data';

import './styles.scss';

const useTicketAssignmentsManager = (): TAM => {
	const modal = useModal();
	const submitAssignments = useOnSubmitAssignments();
	let openModal: ReturnType<ModalFunc>;

	const assignTicketsToDate: TAM['assignTicketsToDate'] = ({ datetimeId, name }) => {
		const title = sprintf(__('Ticket Assignment Manager for Datetime: %s - %s'), datetimeId, name);
		showModal({ assignmentType: 'forDate', entityId: datetimeId, title });
	};

	const assignDatesToTicket: TAM['assignDatesToTicket'] = ({ name, ticketId }) => {
		const title = sprintf(__('Ticket Assignment Manager for Ticket: %s - %s'), ticketId, name);
		showModal({ assignmentType: 'forTicket', entityId: ticketId, title });
	};

	const assignToAll: TAM['assignToAll'] = () => {
		showModal({ assignmentType: 'forAll' });
	};

	const submitButton: ButtonProps = {
		htmlType: 'submit',
		icon: <SaveOutlined />,
	};

	const cancelButton: ButtonProps = {
		onClick: (click) => {
			click.preventDefault();
			destroyModal();
		},
	};

	const destroyModal = () => {
		if (openModal) {
			openModal.destroy();
		}
	};

	const formContent: React.FC<BaseProps> = (props) => {
		const dataState = useDataState();

		const { hasOrphanEntities, getData } = dataState;

		const hasErrors = hasOrphanEntities();
		const data = getData();

		const onSubmit: ButtonProps['onClick'] = useCallback(
			async (click) => {
				click.preventDefault();
				destroyModal();
				await submitAssignments(data);
			},
			[data]
		);

		const onCancel: ButtonProps['onClick'] = useCallback(
			(click) => {
				click.preventDefault();
				if (hasErrors) {
					modal.error({
						title: __('Error'),
						content: <ErrorMessage dataState={dataState} asAlert={false} />,
						maskClosable: true,
					});
				} else {
					destroyModal();
				}
			},
			[hasErrors]
		);

		useEffect(() => {
			if (openModal) {
				openModal.update({
					okButtonProps: {
						...submitButton,
						disabled: hasErrors,
						onClick: onSubmit,
					},
					cancelButtonProps: {
						...cancelButton,
						onClick: onCancel,
					},
					maskClosable: !hasErrors,
				});
			}
		}, [hasErrors, onSubmit]);

		return <TicketAssignmentsManager {...props} />;
	};

	const showModal = (options: BaseProps) => {
		openModal = modal.confirm({
			className: 'ee-ticket-assignments-manager__modal',
			title: options.title || __('Ticket Assignment Manager'),
			content: withContext(formContent, options),
			okButtonProps: submitButton,
			cancelButtonProps: cancelButton,
			okText: __('Submit'),
			cancelText: __('Cancel'),
			maskClosable: true,
			centered: true,
			width: 'auto',
		});
	};

	return {
		assignTicketsToDate,
		assignDatesToTicket,
		assignToAll,
	};
};

export default useTicketAssignmentsManager;
