import React, { useCallback } from 'react';

import EditDateButton from '../dateCard/EditDateButton';
import DeleteDateButton from '../dateCard/DeleteDateButton';
import { EspressoButton } from '@application/ui/input';
import { Datetime } from '../../../services/apollo/types';
import { EntitySubscriptionCallback, DateMenuKey } from '../../entityActionMenu/';
import { AdditionalDateMenuOptions } from '../types';
import { useStatus, TypeName } from '@appServices/apollo/status';

type DatesSubscriptionCallback = EntitySubscriptionCallback<Datetime, DateMenuKey, AdditionalDateMenuOptions>;

const useDatesActionMenuHandler = (): DatesSubscriptionCallback => {
	return useCallback<DatesSubscriptionCallback>(
		({ entityType, entity: date }, { registerMenuItem }, { dateMenuItemProps: menuItemProps }) => {
			// although this is not needed
			if (entityType !== 'datetime') {
				return;
			}

			registerMenuItem('editDate', () => <EditDateButton {...menuItemProps} />);

			registerMenuItem('assignTickets', () => (
				<EspressoButton icon='form' onClick={() => console.log('You clicked TAM')} {...menuItemProps} />
			));

			registerMenuItem('deleteTicket', () => {
				const { isLoaded } = useStatus();
				/* Delete button should be hidden to avoid relational inconsistencies */
				return isLoaded(TypeName.tickets) && <DeleteDateButton id={date.id} {...menuItemProps} />;
			});
		},
		[]
	);
};

export default useDatesActionMenuHandler;
