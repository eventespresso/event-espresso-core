import { useContext } from 'react';
import invariant from 'invariant';

import { DatetimesListContext, DatetimesListContextProps } from './DatetimesListContext';

const useDatesListContext = (): DatetimesListContextProps => {
	const value = useContext(DatetimesListContext);

	invariant(value, 'useDatesListContext must be used inside <DatetimesListProvider> component');

	return value;
};
export default useDatesListContext;
