import { useContext } from 'react';

import { TicketContext, TicketContextProps } from '../context/TicketProvider';

const useTicketContext = (): TicketContextProps => {
	const value = useContext<TicketContextProps>(TicketContext);
	if (!value) {
		throw new Error('useTicketContext must be used inside <TicketProvider> component');
	}
	return value;
};
export default useTicketContext;
