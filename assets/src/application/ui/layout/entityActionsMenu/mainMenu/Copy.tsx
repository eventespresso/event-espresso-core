import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Copy: React.FC<MenuItemProps> = ({ entityType, onClick }) => {
	return <EspressoDropdownMenuItem icon={Icon.COPY} onClick={onClick} title={__('copy ' + entityType)} />;
};

export default Copy;
