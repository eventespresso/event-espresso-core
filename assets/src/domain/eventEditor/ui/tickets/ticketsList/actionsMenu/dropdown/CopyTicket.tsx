import React, { useCallback } from 'react';
import { omit } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { copyTicketFields } from '@sharedEntities/tickets/predicates/updatePredicates';
import { isTicketInputField } from '@sharedEntities/tickets/predicates/selectionPredicates';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { useRelations } from '@appServices/apollo/relations';
import { useTicketItem } from '@edtrServices/apollo';

import { TicketMainMenuProps } from './types';

const CopyTicket: React.FC<TicketMainMenuProps> = ({ id, ...props }) => {
	const ticket = useTicketItem({ id });
	const { createEntity } = useTicketMutator();
	const { getRelations } = useRelations();
	const newTicket = {
		...copyTicketFields(omit(['prices'], ticket), isTicketInputField),
	};
	const datetimes = getRelations({
		entity: 'tickets',
		entityId: ticket.id,
		relation: 'datetimes',
	});

	const onClick = useCallback(() => createEntity({ ...newTicket, datetimes }), [datetimes, newTicket]);

	return <Copy {...props} onClick={onClick} title={__('copy ticket')} />;
};

export default CopyTicket;
