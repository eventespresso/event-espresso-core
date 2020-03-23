import { useEffect } from 'react';

import { useDataState } from '../data';
import { StateChangeListenerHook } from './types';

const useTicketTotalChangeListener: StateChangeListenerHook = (calculatePrice) => {
	const { ticket } = useDataState();

	// Because of the deps, it will run only when ticket total changes
	useEffect(() => {
		calculatePrice();
		console.log('ticket price changed to: ', ticket?.price);
	}, [ticket?.price]);
};

export default useTicketTotalChangeListener;
