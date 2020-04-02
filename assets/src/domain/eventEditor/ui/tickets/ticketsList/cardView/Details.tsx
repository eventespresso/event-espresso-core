import React from 'react';
import { __ } from '@wordpress/i18n';

import TicketDetailsPanel from './TicketDetailsPanel';
import { getPropsAreEqual } from '@appServices/utilities';
import { EditableDesc, EditableName, EditablePrice } from '../editable';
import type { TicketItemProps } from '../types';

const Details: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	return (
		<>
			<EditableName className={'entity-card-details__name'} entity={ticket} />

			<EditableDesc className={'entity-card-details__description'} entity={ticket} />

			<EditablePrice className='entity-card-details__price' entity={ticket} />

			<TicketDetailsPanel entity={ticket} />
		</>
	);
};

export default React.memo(Details, getPropsAreEqual(['entity', 'cacheId']));
