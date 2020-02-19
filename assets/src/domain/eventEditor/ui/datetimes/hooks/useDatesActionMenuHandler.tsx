import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import EditDateButton from '../dateCard/EditDateButton';
import DeleteDateButton from '../dateCard/DeleteDateButton';
import { EspressoButton } from '@application/ui/input';
import { Datetime } from '../../../services/apollo/types';
import { EntitySubscriptionCallback, MenuKey, EntityType } from '@appLayout/entityActionsMenu';
import { AdditionalDateMenuOptions } from '../types';
import { useStatus, TypeName } from '@appServices/apollo/status';

type DatesSubscriptionCallback = EntitySubscriptionCallback<Datetime, EntityType, MenuKey, AdditionalDateMenuOptions>;

const useDatesActionMenuHandler = (): DatesSubscriptionCallback => {
	return useCallback<DatesSubscriptionCallback>(
		({ entityType, entity: date }, { registerMenuItem }, { dateMenuItemProps: menuItemProps }) => {
			// although this is not needed
			if (entityType !== 'datetime') {
				return;
			}

			registerMenuItem('editDate', () => <EditDateButton {...menuItemProps} />);

			registerMenuItem('assignTickets', () => (
				<EspressoButton
					icon='tags'
					tooltip={__('assign tickets')}
					tooltipProps={{ placement: 'right' }}
					onClick={() => console.log('You clicked TAM')}
					{...menuItemProps}
				/>
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
