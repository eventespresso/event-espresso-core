import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { TicketItemProps } from '../types';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { InlineEditText } from '@appInputs/InlineEditInput';
import { getPropsAreEqual } from '@appServices/utilities';

interface EditableNameProps extends TicketItemProps {
	className?: string;
	view?: 'card' | 'table';
}

const EditableName: React.FC<EditableNameProps> = ({ className, entity: ticket, view = 'card' }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== ticket.name) {
				updateEntity({ name });
			}
		},
		[ticket.cacheId]
	);

	const ticketName = ticket.name ? ticket.name : __('Edit title...');

	return (
		<InlineEditText
			fitText={view === 'card'}
			tag={view === 'table' ? 'p' : 'h4'}
			className={className}
			onChangeValue={onChangeName}
			value={ticketName}
		/>
	);
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
