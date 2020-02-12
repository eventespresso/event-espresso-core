import React, { useCallback } from 'react';

import EditDateButton from '../dateCard/EditDateButton';
import { EspressoButton } from '@application/ui/input';
import { Datetime } from '../../../services/apollo/types';
import { SubscriptionCallback, DateMenuKey } from '../../entityActionMenu/';

type DatesSubscriptionCallback = SubscriptionCallback<Datetime, DateMenuKey>;

const useDatesActionMenuHandler = (): DatesSubscriptionCallback => {
	return useCallback<DatesSubscriptionCallback>(({ entityType, entity: date }, { registerMenuItem }) => {
		// although this is not needed
		if (entityType !== 'datetime') {
			return;
		}
		registerMenuItem('editDate', () => <EditDateButton key={date.id + 'editDate'} />);

		registerMenuItem('assignTickets', () => (
			<EspressoButton
				icon='form'
				onClick={() => console.log('You clicked TAM')}
				key={date.id + 'assignTickets'}
			/>
		));
	}, []);
};

export default useDatesActionMenuHandler;
