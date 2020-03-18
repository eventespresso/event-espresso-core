import React, { useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import TicketAssignmentsManager from './TicketAssignmentsManager';
import { ButtonProps } from 'antd/lib/button';
import { ModalFunc } from 'antd/lib/modal/confirm';
import { SaveOutlined } from '@ant-design/icons';
import { TAMProps, TicketAssignmentsManager as TAM } from './types';
import useModal from '@appLayout/modal/useModal';
import withTAMProvider from './withTAMProvider';
import useTAMState from './useTAMState';
import useOnSubmitAssignments from './useOnSubmitAssignments';
import ErrorMessage from './ErrorMessage';

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

	const formContent: React.FC<TAMProps> = (props) => {
		const TAMState = useTAMState();

		const { hasOrphanEntities, getData } = TAMState;

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
						content: <ErrorMessage TAMState={TAMState} asAlert={false} />,
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

	const showModal = (options: TAMProps) => {
		openModal = modal.confirm({
			title: __('Ticket Assignment Manager'),
			content: withTAMProvider(formContent, options),
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
		assignTicketsToDate,
		assignDatesToTicket,
		assignToAll,
	};
};

export default useTicketAssignmentsManager;
