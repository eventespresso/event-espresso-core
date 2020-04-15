import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { DateItemProps } from '../types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { InlineEditHeading, InlineEditText } from '@appInputs/InlineEditInput';
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
		className,
		onSubmit,
		defaultValue: dateName,
	};

	return view === 'table' ? <InlineEditText {...editableProps} /> : <InlineEditHeading {...editableProps} as='h3' />;
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
