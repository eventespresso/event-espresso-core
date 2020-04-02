import React from 'react';
import { __ } from '@wordpress/i18n';

import DateDetailsPanel from './DateDetailsPanel';
import { getPropsAreEqual } from '@appServices/utilities';
import { EditableDesc, EditableName } from '../editable';
import type { DateItemProps } from '../types';

const Details: React.FC<DateItemProps> = ({entity: datetime }) => {
	return (
		<>
			<EditableName className={'entity-card-details__name'} entity={datetime} />

			<EditableDesc className={'entity-card-details__description'} entity={datetime} />

			<DateDetailsPanel entity={datetime} />
		</>
	);
};

export default React.memo(Details, getPropsAreEqual(['entity', 'cacheId']));
