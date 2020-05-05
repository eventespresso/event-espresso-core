import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';
import { useDatetimeItem } from '@edtrServices/apollo';
import { useConfirmationDialog } from '@application/ui/input';
import useActions from './useActions';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

import { DateMainMenuProps } from './types';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime: entity }) => {
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const datetime = useDatetimeItem({ id: entity.id });
	const confirmText = __('Are you sure you want to delete this?');

	const { copyDate, editDate, trashDate, trashed } = useActions({ datetime });

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
