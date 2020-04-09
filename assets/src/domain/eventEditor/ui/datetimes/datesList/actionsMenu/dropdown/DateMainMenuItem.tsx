import React from 'react';
import { __ } from '@wordpress/i18n';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

import { DropdownMenu } from '@application/ui/layout';
import { Icon } from '@application/ui/input';

const DateMainMenuItem: React.FC = () => {
	const toggleProps = {
		icon: Icon.MORE,
		label: __('event date main menu'),
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
