import React from 'react';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { DateMainMenuProps } from './types';

const CopyDate: React.FC<DateMainMenuProps> = ({ copyDate, ...props }) => {
	return <Copy {...props} onClick={copyDate} title={__('copy datetime')} />;
};

export default CopyDate;
