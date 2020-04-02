import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { TicketItemProps } from '../types';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { InlineEditHeading } from '@appInputs/InlineEditInput';
import { getPropsAreEqual } from '@appServices/utilities';

interface EditableNameProps extends TicketItemProps {
	className?: string;
}

const EditableName: React.FC<EditableNameProps> = ({ entity: ticket, className }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== ticket.name) {
				updateEntity({ name });
				updateEntity({ name });
			}
		},
		[ticket.cacheId]
	);

	return (
		<InlineEditHeading level={3} className={className} onChange={onChangeName}>
			{ticket.name ? ticket.name : __('Edit title...')}
		</InlineEditHeading>
	);
};

export default React.memo(EditableName, getPropsAreEqual(['entity', 'name']));
