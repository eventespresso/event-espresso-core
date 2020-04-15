import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { TicketItemProps } from '../types';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { InlineEditHeading, InlineEditText } from '@appInputs/InlineEditInput';
import { getPropsAreEqual } from '@appServices/utilities';

interface EditableNameProps extends TicketItemProps {
	className?: string;
	view?: 'card' | 'table';
}

const EditableName: React.FC<EditableNameProps> = ({ className, entity: ticket, view = 'card' }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onSubmit = useCallback(
		(name: string): void => {
			if (name !== ticket.name) {
				updateEntity({ name });
			}
		},
		[ticket.cacheId]
	);

	const ticketName = ticket.name ? ticket.name : __('Edit title...');
	const editableProps = {
		className,
		onSubmit,
		defaultValue: ticketName,
	};

	return view === 'table' ? <InlineEditText {...editableProps} /> : <InlineEditHeading {...editableProps} as='h3' />;
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
