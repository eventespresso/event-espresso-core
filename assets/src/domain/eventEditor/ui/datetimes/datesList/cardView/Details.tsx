import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import DateDetailsPanel from './DateDetailsPanel';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import type { Datetime } from '@edtrServices/apollo/types';
import { getPropsAreEqual } from '@appServices/utilities';

interface DetailsProps {
	datetime: Datetime;
}

const Details: React.FC<DetailsProps> = ({ datetime }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== datetime.name) {
				updateEntity({ name });
			}
		},
		[datetime.cacheId]
	);

	const onChangeDesc = useCallback(
		(description: string): void => {
			if (description !== datetime.description) {
				updateEntity({ description });
			}
		},
		[datetime.cacheId]
	);

	return (
		<>
			<InlineEditHeading level={3} className={'entity-card-details__name'} onChange={onChangeName}>
				{datetime.name ? datetime.name : __('Edit title...')}
			</InlineEditHeading>

			<InlineEditTextArea className={'entity-card-details__description'} onChange={onChangeDesc}>
				{datetime.description ? datetime.description : __('Edit description...')}
			</InlineEditTextArea>

			<DateDetailsPanel datetime={datetime} />
		</>
	);
};

export default React.memo(Details, getPropsAreEqual(['datetime', 'cacheId']));
