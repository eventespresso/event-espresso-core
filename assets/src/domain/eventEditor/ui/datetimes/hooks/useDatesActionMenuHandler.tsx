import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import EditDateButton from '../datesList/actionsMenu/EditDateButton';
import DeleteDateButton from '../datesList/actionsMenu/DeleteDateButton';
import AssignTicketsButton from '../datesList/actionsMenu/AssignTicketsButton';
import { Datetime } from '@edtrServices/apollo/types';
import { EntitySubscriptionCallback } from '@appLayout/entityActionsMenu';
import { AdditionalDateMenuOptions } from '../types';
import { useStatus, TypeName } from '@appServices/apollo/status';

type DatesSubscriptionCallback = EntitySubscriptionCallback<Datetime, AdditionalDateMenuOptions>;

const useDatesActionMenuHandler = (): DatesSubscriptionCallback => {
	return useCallback<DatesSubscriptionCallback>(({ entityType, entity: date }, { registerMenuItem }) => {
		// although this is not needed
		if (entityType !== 'datetime') {
			return;
		}

		registerMenuItem('editDate', () => <EditDateButton />);

		registerMenuItem('assignTickets', () => <AssignTicketsButton id={date.id} />);

		registerMenuItem('deleteTicket', () => {
			const { isLoaded } = useStatus();
			/* Delete button should be hidden to avoid relational inconsistencies */
			return isLoaded(TypeName.tickets) && <DeleteDateButton id={date.id} />;
		});
	}, []);
};

export default useDatesActionMenuHandler;
