import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import AssignTicketsButton from '../datesList/actionsMenu/AssignTicketsButton';
import { DateMainMenuItem } from '../datesList/actionsMenu/dropdown';

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

		registerMenuItem('dateMainMenu', () => <DateMainMenuItem />);

		registerMenuItem('assignTickets', () => <AssignTicketsButton id={date.id} />);
	}, []);
};

export default useDatesActionMenuHandler;
