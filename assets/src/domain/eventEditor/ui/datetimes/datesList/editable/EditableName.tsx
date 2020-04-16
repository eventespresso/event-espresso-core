import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { DateItemProps } from '../types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { InlineEditText } from '@appInputs/InlineEditInput';
import { getPropsAreEqual } from '@appServices/utilities';

interface EditableNameProps extends DateItemProps {
	className?: string;
	view?: 'card' | 'table';
}

const EditableName: React.FC<EditableNameProps> = ({ className, entity: datetime, view = 'card' }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== datetime.name) {
				updateEntity({ name });
			}
		},
		[datetime.cacheId]
	);

	const dateName = datetime.name ? datetime.name : __('Edit title...');

	return (
		<InlineEditText
			tag={view === 'table' ? 'p' : 'h4'}
			className={className}
			onChangeValue={onChangeName}
			value={dateName}
		/>
	);
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
