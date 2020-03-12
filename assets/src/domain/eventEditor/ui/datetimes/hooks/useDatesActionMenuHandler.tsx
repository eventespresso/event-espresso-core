import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import EditDateButton from '../datesList/actionsMenu/EditDateButton';
import DeleteDateButton from '../datesList/actionsMenu/DeleteDateButton';
import AssignTicketsButton from '../datesList/actionsMenu/AssignTicketsButton';
import { Datetime } from '@edtrServices/apollo/types';
import { EntityActionsSubscriptionCb } from '@appLayout/entityActionsMenu';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';

type DatesSubscriptionCallback = EntityActionsSubscriptionCb<Datetime, 'datetime'>;

const useDatesActionMenuHandler = (): DatesSubscriptionCallback => {
	return useCallback<DatesSubscriptionCallback>(
		({ entityType, entity: date }, { registerElement: registerMenuItem }) => {
			// although this is not needed
			if (entityType !== 'datetime') {
				return;
			}
			const withTicketsLoaded = withIsLoaded(TypeName.tickets);

			registerMenuItem('editDate', () => <EditDateButton />);

			registerMenuItem(
				'assignTickets',
				withTicketsLoaded(({ loaded }) => {
					/* Hide TAM unless tickets are loaded */
					return loaded && <AssignTicketsButton id={date.id} />;
				})
			);

			registerMenuItem(
				'deleteTicket',
				withTicketsLoaded(({ loaded }) => {
					/* Delete button should be hidden to avoid relational inconsistencies */
					return loaded && <DeleteDateButton id={date.id} />;
				})
			);
		},
		[]
	);
};

export default useDatesActionMenuHandler;
