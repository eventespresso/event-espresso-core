import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { DateItemProps } from '../types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { InlineEditHeading } from '@appInputs/InlineEditInput';
import { getPropsAreEqual } from '@appServices/utilities';

interface EditableNameProps extends DateItemProps {
	className?: string;
}

const EditableName: React.FC<EditableNameProps> = ({ entity: datetime, className }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== datetime.name) {
				updateEntity({ name });
			}
		},
		[datetime.cacheId]
	);

	return (
		<InlineEditHeading level={3} className={className} onChange={onChangeName}>
			{datetime.name ? datetime.name : __('Edit title...')}
		</InlineEditHeading>
	);
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
