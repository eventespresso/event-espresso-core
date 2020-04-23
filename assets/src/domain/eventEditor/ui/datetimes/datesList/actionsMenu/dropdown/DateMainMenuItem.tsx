import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

import { DateMainMenuItemProps } from './types';

const DateMainMenuItem: React.FC<DateMainMenuItemProps> = ({ datetime }) => {
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

export default DateMainMenuItem;
