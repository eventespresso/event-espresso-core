import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import AssignTicketsButton from '../datesList/actionsMenu/AssignTicketsButton';
import { DateEntityMainMenuItem } from '../datesList/actionsMenu/dateEntityMainMenuItem';
import DeleteDateButton from '../datesList/actionsMenu/DeleteDateButton';
import EditDateButton from '../datesList/actionsMenu/EditDateButton';

import { Datetime } from '@edtrServices/apollo/types';
import { EntityActionsSubscriptionCb } from '@appLayout/entityActionsMenu';

type DatesSubscriptionCallback = EntityActionsSubscriptionCb<Datetime, 'datetime'>;

const useDatesActionMenuHandler = (): DatesSubscriptionCallback => {
	return useCallback<DatesSubscriptionCallback>(({ entityType, entity: date, registry }) => {
		// although this is not needed
		if (entityType !== 'datetime') {
			return;
		}

		const { registerElement: registerMenuItem } = registry;

		registerMenuItem('mainMenu', () => <DateEntityMainMenuItem />);

		registerMenuItem('editDate', () => <EditDateButton />);

		registerMenuItem('assignTickets', () => <AssignTicketsButton id={date.id} />);

		registerMenuItem('deleteTicket', () => <DeleteDateButton id={date.id} />);
	}, []);
};

export default useDatesActionMenuHandler;
