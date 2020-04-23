import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useFormModal } from '@appLayout/formModal';

import { DateMainMenuProps } from './types';

const EditDate: React.FC<DateMainMenuProps> = ({ datetime, ...props }) => {
	const { openEditor } = useFormModal();
	const onClick = useCallback(
		() =>
			openEditor({
				editorId: 'editDatetime',
				entityId: datetime.id,
				entityDbId: datetime.dbId,
			}),
		[datetime.id]
	);

	return <Edit {...props} onClick={onClick} title={__('edit datetime')} />;
};

export default EditDate;
