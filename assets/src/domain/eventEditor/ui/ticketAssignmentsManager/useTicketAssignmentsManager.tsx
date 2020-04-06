import React, { useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { TicketAssignmentsManager, ErrorMessage } from './components';
import { ButtonProps } from 'antd/lib/button';
import { ModalFunc } from 'antd/lib/modal/confirm';
import { SaveOutlined } from '@ant-design/icons';
import { BaseProps, TicketAssignmentsManager as TAM } from './types';
import useModal from '@appLayout/modal/useModal';
import { withContext } from './context';
import { useDataState, useOnSubmitAssignments } from './data';

const useTicketAssignmentsManager = (): TAM => {
	const modal = useModal();
	const submitAssignments = useOnSubmitAssignments();
	let openModal: ReturnType<ModalFunc>;

	const assignTicketsToDate: TAM['assignTicketsToDate'] = ({ datetimeId }) => {
		showModal({ assignmentType: 'forDate', entityId: datetimeId });
	};

	const assignDatesToTicket: TAM['assignDatesToTicket'] = ({ ticketId }) => {
		showModal({ assignmentType: 'forTicket', entityId: ticketId });
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
			cancelButtonProps: cancelButton,
			cancelText: __('Cancel'),
			centered: true,
			className: 'ee-modal ee-tam-modal',
			content: withContext(formContent, options),
			maskClosable: true,
			okButtonProps: submitButton,
			okText: __('Submit'),
			title: __('Ticket Assignment Manager'),
			width: '80%',
			zIndex: 1200,
		});
	};

	return {
		assignTicketsToDate,
		assignDatesToTicket,
		assignToAll,
	};
};

export default useTicketAssignmentsManager;
