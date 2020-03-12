import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenu } from '@application/ui/layout';
import { Icon } from '@application/ui/input';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useFormModal } from '@appLayout/formModal';

const DateEntityMainMenuItem = () => {
	const { id } = useDatetimeContext();
	const { dbId: entityDbId } = useDatetimeItem({ id }) || {};
	const { openEditor } = useFormModal();
	const { deleteEntity } = useDatetimeMutator(id);

	const onEditClick = (): void =>
		openEditor({
			editorId: 'editDatetime',
			entityId: id,
			entityDbId,
		});

	return (
		<EspressoDropdownMenu
			icon={Icon.EDIT}
			label={__('event date main menu')}
			controls={[
				{
					title: __('edit date'),
					icon: Icon.EDIT,
					onClick: onEditClick,
					// onClick: useOpenEditor(useEventDateEditorId(dateEntity)),
				},
				// {
				// 	title: __('copy date'),
				// 	icon: 'admin-page',
				// 	onClick: useCopyDateEntity(dateEntity),
				// },
				{
					title: __('trash date'),
					icon: 'trash',
					onClick: () => deleteEntity({ id }),
				},
			]}
		/>
	);
};

export default DateEntityMainMenuItem;
