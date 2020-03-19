import React from 'react';
import { __ } from '@wordpress/i18n';

import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useFormModal } from '@appLayout/formModal';

const EditDate = (props) => {
	const { id } = useDatetimeContext();
	const datetime = useDatetimeItem({ id });
	const { openEditor } = useFormModal();
	const onClick = () =>
		openEditor({
			editorId: 'editDatetime',
			entityId: id,
			entityDbId: datetime.dbId,
		});
	const title = __('edit datetime');

	return <Edit {...props} onClick={onClick} title={title} />;
};

export default EditDate;
