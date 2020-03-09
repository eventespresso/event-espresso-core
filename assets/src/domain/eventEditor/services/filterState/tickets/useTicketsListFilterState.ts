import { useContext } from 'react';
import invariant from 'invariant';

import { TicketsListContext, TicketsListContextProps } from '../../context/EntityListContext';

const useTicketsListFilterState = (): TicketsListContextProps['filters'] => {
	const value = useContext(TicketsListContext);

	invariant(value, 'useTicketsListFilterState must be used inside <TicketsListProvider> component');

	return value?.filters;
};
export default useTicketsListFilterState;
