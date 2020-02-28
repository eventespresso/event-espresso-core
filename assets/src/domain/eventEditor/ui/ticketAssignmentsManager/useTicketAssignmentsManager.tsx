import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import TicketAssignmentsManager from './TicketAssignmentsManager';
import { ButtonProps } from 'antd/lib/button';
import { ModalFunc } from 'antd/lib/modal/confirm';
import { SaveOutlined } from '@ant-design/icons';
import { TAMProps, TicketAssignmentsManager as TAM } from './types';
import useModal from '@appLayout/modal/useModal';
import withTAMProvider from './withTAMProvider';
import useTAMState from './useTAMState';

const useTicketAssignmentsManager = (): TAM => {
	const modal = useModal();
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
		const { hasOrphanEntities, getData } = useTAMState();

		const onSubmit: ButtonProps['onClick'] = (click) => {
			click.preventDefault();
			console.log('data', getData());
			destroyModal();
		};

		useEffect(() => {
			if (openModal) {
				openModal.update({
					okButtonProps: {
						...submitButton,
						disabled: hasOrphanEntities(),
						onClick: onSubmit,
					},
				});
			}
		}, [hasOrphanEntities]);

		return <TicketAssignmentsManager {...props} />;
	};

	const showModal = (options: TAMProps) => {
		openModal = modal.confirm({
			title: 'Ticket Assignment Manager',
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
