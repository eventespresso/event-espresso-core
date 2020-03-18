import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Trash: React.FC<MenuItemProps> = ({ entityType, onClick }) => {
	return <EspressoDropdownMenuItem icon={Icon.TRASH} onClick={onClick} title={__('edit ' + entityType)} />;
};

export default Trash;
