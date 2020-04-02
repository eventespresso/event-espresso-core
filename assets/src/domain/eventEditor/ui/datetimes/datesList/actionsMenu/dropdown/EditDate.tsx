import React, { useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';

import { Edit, MenuItemProps } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useFormModal } from '@appLayout/formModal';

const EditDate: React.FC<MenuItemProps> = (props) => {
	const { id } = useDatetimeContext();
	const datetime = useDatetimeItem({ id });
	const { openEditor } = useFormModal();
	const onClick = useCallback(
		() =>
			openEditor({
				editorId: 'editDatetime',
				entityId: id,
				entityDbId: datetime.dbId,
			}),
		[id]
	);
	const ref = useRef();

	return <Edit {...props} focusOnMount ref={ref} onClick={onClick} title={__('edit datetime')} />;
};

export default EditDate;
