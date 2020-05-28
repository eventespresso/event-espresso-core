import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDisclosure } from '@chakra-ui/core';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';
import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useConfirmationDialog } from '@application/ui/display/confirm';
import { Container as FormContainer } from '@edtrUI/datetimes/dateForm/multiStep';

import { DateMainMenuProps } from './types';
import useActions from './useActions';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime }) => {
	const { copyDate, trashDate, trashed } = useActions({ datetimeId: datetime.id });

	const { isOpen, onClose, onOpen: onOpenEditModal } = useDisclosure();

	const title = trashed ? __('Permanently delete Datetime?') : __('Move Datetime to Trash?');
	const message = trashed
		? __(
				'Are you sure you want to permanently delete this datetime? This action is permanent and can not be undone.'
		  )
		: __(
				'Are you sure you want to move this datetime to the trash?  This action is permanent and can not be undone.'
		  );
	const { confirmationDialog, onOpen } = useConfirmationDialog({
		message,
		title,
		onConfirm: trashDate,
	});

	const toggleProps: DropdownToggleProps = {
		tooltip: __('event date main menu'),
		tooltipProps: { placement: 'right' },
	};

	const trashDateTitle = trashed ? __('delete permanently') : __('trash datetime');

	return (
		<>
			<DropdownMenu toggleProps={toggleProps}>
				<Edit onClick={onOpenEditModal} title={__('edit datetime')} />
				<Copy onClick={copyDate} title={__('copy datetime')} />
				<Trash onClick={onOpen} title={trashDateTitle} />
			</DropdownMenu>
			{confirmationDialog}
			<FormContainer datetimeId={datetime.id} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default React.memo(DateMainMenu);
