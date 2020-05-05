import React from 'react';
import { __ } from '@wordpress/i18n';

import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { DateMainMenuProps } from './types';

const EditDate: React.FC<DateMainMenuProps> = ({ editDate, ...props }) => {
	return <Edit {...props} onClick={editDate} title={__('edit datetime')} />;
};

export default EditDate;
