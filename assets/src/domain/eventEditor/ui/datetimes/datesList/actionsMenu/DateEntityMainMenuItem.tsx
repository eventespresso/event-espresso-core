import React from 'react';
import { omit } from 'ramda';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenu } from '@application/ui/layout';
import { Icon } from '@application/ui/input';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useFormModal } from '@appLayout/formModal';

const DateEntityMainMenuItem = () => {
	const { id } = useDatetimeContext();
	const datetime = useDatetimeItem({ id });

	const { createEntity } = useDatetimeMutator();
	const { deleteEntity } = useDatetimeMutator(id);
	const { openEditor } = useFormModal();

	const newDatetime = omit(
		[
			'dbId',
			'id',
			'isActive',
			'isExpired',
			'isSoldOut',
			'isTrashed',
			'isUpcoming',
			'length',
			'status',
			'__typename',
		],
		datetime
	);

	const onEditClick = (): void =>
		openEditor({
			editorId: 'editDatetime',
			entityId: id,
			entityDbId: datetime.dbId,
		});

	return (
		<EspressoDropdownMenu
			icon={Icon.MORE}
			label={__('event date main menu')}
			controls={[
				{
					title: __('edit date'),
					icon: Icon.EDIT,
					onClick: onEditClick,
				},
				{
					title: __('copy date'),
					icon: Icon.COPY,
					onClick: () => createEntity(newDatetime),
				},
				{
					title: __('trash date'),
					icon: Icon.TRASH,
					onClick: () => deleteEntity({ id }),
				},
			]}
		/>
	);
};

export default DateEntityMainMenuItem;
