import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { DateItemProps } from '../types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { InlineEditTextArea } from '@appInputs/InlineEditInput';
import { getPropsAreEqual } from '@appServices/utilities';

interface EditableDescProps extends DateItemProps {
	className?: string;
}

const EditableDesc: React.FC<EditableDescProps> = ({ entity: datetime, className }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const defaultValue = datetime.description ? datetime.description : __('Edit description...');

	const onSubmit = useCallback(
		(description: string): void => {
			if (description !== datetime.description) {
				updateEntity({ description });
			}
		},
		[datetime.cacheId]
	);

	return <InlineEditTextArea className={className} defaultValue={defaultValue} onSubmit={onSubmit} />;
};

export default React.memo(EditableDesc, getPropsAreEqual(['entity', 'description']));
