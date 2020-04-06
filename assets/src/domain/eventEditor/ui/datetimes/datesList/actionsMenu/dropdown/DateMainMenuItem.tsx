import React from 'react';
import { __ } from '@wordpress/i18n';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

import { EspressoDropdownMenu } from '@application/ui/layout';
import { Icon } from '@application/ui/input';

import './styles.scss';

const DateMainMenuItem: React.FC = () => (
	<EspressoDropdownMenu icon={Icon.MORE} label={__('event date main menu')} menuProps={{ className: 'date-menu' }}>
		<EditDate />
		<CopyDate />
		<TrashDate />
	</EspressoDropdownMenu>
);

export default DateMainMenuItem;
