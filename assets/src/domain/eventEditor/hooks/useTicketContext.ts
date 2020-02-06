import { useContext } from 'react';
import invariant from 'invariant';

import { TicketContext } from '../services/context/TicketContext';
import { EntityContextProps } from '../services/context/types';

const useTicketContext = (): EntityContextProps => {
	const value = useContext<EntityContextProps>(TicketContext);

	invariant(value, 'useTicketContext must be used inside <TicketProvider> component');

	return value;
};
export default useTicketContext;
