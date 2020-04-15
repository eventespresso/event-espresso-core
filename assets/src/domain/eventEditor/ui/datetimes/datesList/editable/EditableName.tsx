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

	const onSubmit = useCallback(
		(name: string): void => {
			if (name !== datetime.name) {
				updateEntity({ name });
			}
		},
		[datetime.cacheId]
	);

	const dateName = datetime.name ? datetime.name : __('Edit title...');
	const editableProps = {
		as: (view === 'table' ? 'p' : 'h3') as React.ElementType,
		className,
		onSubmit,
		defaultValue: dateName,
	};

	return <InlineEditText {...editableProps} />;
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
