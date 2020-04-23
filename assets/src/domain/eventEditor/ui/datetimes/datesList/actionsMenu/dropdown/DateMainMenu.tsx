import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

import { DateMainMenuProps } from './types';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime }) => {
	const toggleProps: DropdownToggleProps = {
		tooltip: __('event date main menu'),
	};

	return (
		<DropdownMenu toggleProps={toggleProps}>
			<EditDate datetime={datetime} />
			<CopyDate datetime={datetime} />
			<TrashDate datetime={datetime} />
		</DropdownMenu>
	);
};

export default DateMainMenu;
