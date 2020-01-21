import { useContext } from 'react';
import invariant from 'invariant';

import { TicketContext, TicketContextProps } from '../context/TicketProvider';

const useTicketContext = (): TicketContextProps => {
	const value = useContext<TicketContextProps>(TicketContext);

	invariant(value, 'useTicketContext must be used inside <TicketProvider> component');

	return value;
};
export default useTicketContext;
