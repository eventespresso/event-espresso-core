import { useContext } from 'react';
import invariant from 'invariant';

import { TicketsListContext, TicketsListContextProps } from './TicketsListContext';

const useTicketsListContext = (): TicketsListContextProps => {
	const value = useContext(TicketsListContext);

	invariant(value, 'useTicketsListContext must be used inside <TicketsListProvider> component');

	return value;
};
export default useTicketsListContext;
