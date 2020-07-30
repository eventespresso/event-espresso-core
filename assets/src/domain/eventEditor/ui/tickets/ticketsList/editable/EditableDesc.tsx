import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { TicketItemProps } from '../types';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { InlineEditTextArea } from '@appInputs/InlineEditInput';
import { getPropsAreEqual } from '@appServices/utilities';

interface EditableDescProps extends TicketItemProps {
	className?: string;
}

const EditableDesc: React.FC<EditableDescProps> = ({ entity: ticket, className }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onChangeDesc = useCallback(
		(description: string): void => {
			if (description !== ticket.description) {
				updateEntity({ description });
			}
		},
		[ticket.cacheId]
	);

	const tooltip = __('edit description...');

	const ticketDesc = ticket.description || tooltip;

	return (
		<InlineEditTextArea className={className} onChangeValue={onChangeDesc} tooltip={tooltip} value={ticketDesc} />
	);
};

export default React.memo(EditableDesc, getPropsAreEqual(['entity', 'description']));
