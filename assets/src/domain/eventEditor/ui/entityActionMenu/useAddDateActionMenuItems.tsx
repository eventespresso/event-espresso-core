import React, { useCallback } from 'react';

import EditDateButton from '../datetimes/dateCard/EditDateButton';
import { EspressoButton } from '@application/ui/input';
import { Datetime } from '../../services/apollo/types';
import { EntityType, DateMenuKey, TicketMenuKey } from './types';
import { EntityActionsManager } from '@appLayout/entityActionMenu';

export type DateActionsMenuCallback = (date: Datetime, entityActionsManager: EntityActionsManager<DateMenuKey>) => void;

const useAddDateActionMenuItems = (): DateActionsMenuCallback => {
	return useCallback<DateActionsMenuCallback>((date, { registerMenuItem }) => {
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

export default useAddDateActionMenuItems;
