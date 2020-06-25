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

	const tooltip = __('Click to edit title...');

	const dateName = datetime.name || tooltip;

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== datetime.name) {
				updateEntity({ name });
			}
		},
		[datetime.cacheId]
	);

	return (
		<InlineEditText
			fitText={view === 'card'}
			tag={view === 'table' ? 'p' : 'h4'}
			className={className}
			onChangeValue={onChangeName}
			tooltip={tooltip}
			value={dateName}
		/>
	);
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
