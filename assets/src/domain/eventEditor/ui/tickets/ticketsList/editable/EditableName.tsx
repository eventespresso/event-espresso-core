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
		as: (view === 'table' ? 'p' : 'h3') as React.ElementType,
		className,
		onSubmit,
		defaultValue: ticketName,
	};

	return <InlineEditText {...editableProps} />;
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
