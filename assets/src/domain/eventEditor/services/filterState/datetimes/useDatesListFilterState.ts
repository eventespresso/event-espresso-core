import { useContext } from 'react';
import invariant from 'invariant';

import { DatetimesListContext, DatetimesListContextProps } from '../../context/EntityListContext';

const useDatesListFilterState = (): DatetimesListContextProps['filters'] => {
	const value = useContext(DatetimesListContext);

	invariant(value, 'useDatesListFilterState must be used inside <DatetimesListProvider> component');

	return value?.filters;
};
export default useDatesListFilterState;
