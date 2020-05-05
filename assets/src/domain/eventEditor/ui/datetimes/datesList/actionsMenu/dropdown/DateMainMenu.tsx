import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';
import { useConfirmationDialog } from '@application/ui/input';
import useActions from './useActions';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

import { DateMainMenuProps } from './types';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime }) => {
	const confirmText = __('Are you sure you want to delete this?');

	const { copyDate, editDate, trashDate, trashed } = useActions({ datetimeId: datetime.id });

	const { confirmationDialog, onOpen } = useConfirmationDialog({
		confirmText,
		onConfirm: trashDate,
	});

	const toggleProps: DropdownToggleProps = {
		tooltip: __('event date main menu'),
	};

	return (
		<>
			<DropdownMenu toggleProps={toggleProps}>
				<EditDate editDate={editDate} />
				<CopyDate copyDate={copyDate} />
				<TrashDate onClick={onOpen} trashed={trashed} />
			</DropdownMenu>
			{confirmationDialog}
		</>
	);
};

export default DateMainMenu;
