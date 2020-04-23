import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

import { DateMenuItemProps } from './types';

const TrashDate: React.FC<DateMenuItemProps> = ({ datetime, ...props }) => {
	const id = datetime?.id;
	const { deleteEntity } = useDatetimeMutator(id);
	const onClick = useCallback(() => deleteEntity({ id }), [id]);

	return <Trash {...props} onClick={onClick} title={__('trash datetime')} />;
};

export default TrashDate;
