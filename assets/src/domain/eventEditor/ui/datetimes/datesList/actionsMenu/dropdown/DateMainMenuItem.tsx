import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

const DateMainMenuItem: React.FC = () => {
	const toggleProps: DropdownToggleProps = {
		tooltip: __('event date main menu'),
	};

	return (
		<DropdownMenu toggleProps={toggleProps}>
			<EditDate />
			<CopyDate />
			<TrashDate />
		</DropdownMenu>
	);
};

export default DateMainMenuItem;
