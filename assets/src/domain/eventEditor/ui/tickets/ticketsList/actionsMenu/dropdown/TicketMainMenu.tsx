import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDisclosure } from '@chakra-ui/hooks';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';
import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useConfirmationDialog } from '@application/ui/display/confirm';

import { Container as FormContainer } from '@edtrUI/tickets/ticketForm/multiStep';
import { TicketMainMenuProps } from './types';
import useActions from './useActions';

const TicketMainMenu: React.FC<TicketMainMenuProps> = ({ ticket }) => {
	const { copyTicket, trashTicket, trashed } = useActions({ ticketId: ticket.id });

	const { isOpen, onClose, onOpen: onOpenEditModal } = useDisclosure();

	const title = trashed ? __('Permanently delete Ticket?') : __('Move Ticket to Trash?');
	const message = trashed
		? __('Are you sure you want to permanently delete this ticket? This action is permanent and can not be undone.')
		: __(
				'Are you sure you want to move this ticket to the trash? You can "untrash" this ticket later if you need to.'
		  );
	const { confirmationDialog, onOpen } = useConfirmationDialog({
		message,
		title,
		onConfirm: trashTicket,
	});
	const toggleProps: DropdownToggleProps = {
		tooltip: __('ticket main menu'),
		tooltipProps: { placement: 'left' },
	};

	const trashTicketTitle = trashed ? __('delete permanently') : __('trash ticket');

	return (
		<>
			<DropdownMenu toggleProps={toggleProps}>
				<Edit onClick={onOpenEditModal} title={__('edit ticket')} />
				<Copy onClick={copyTicket} title={__('copy ticket')} />
				<Trash onClick={onOpen} title={trashTicketTitle} />
			</DropdownMenu>
			{confirmationDialog}
			<FormContainer ticketId={ticket.id} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default TicketMainMenu;
