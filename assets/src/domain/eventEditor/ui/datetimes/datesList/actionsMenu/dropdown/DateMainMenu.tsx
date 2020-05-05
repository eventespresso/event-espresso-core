import React from 'react';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';
import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useConfirmationDialog } from '@application/ui/display/confirm';

import { DateMainMenuProps } from './types';
import useActions from './useActions';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime }) => {
	const { copyDate, editDate, trashDate, trashed } = useActions({ datetimeId: datetime.id });

	const confirmText = __('Are you sure you want to delete this?');
	const { confirmationDialog, onOpen } = useConfirmationDialog({
		confirmText,
		onConfirm: trashDate,
	});

	const toggleProps: DropdownToggleProps = {
		tooltip: __('event date main menu'),
	};

	const trashDateTitle = trashed ? __('delete permanently') : __('trash datetime');

	return (
		<>
			<DropdownMenu toggleProps={toggleProps}>
				<Edit onClick={editDate} title={__('edit datetime')} />
				<Copy onClick={copyDate} title={__('copy datetime')} />
				<Trash onClick={onOpen} title={trashDateTitle} />
			</DropdownMenu>
			{confirmationDialog}
		</>
	);
};

export default DateMainMenu;
