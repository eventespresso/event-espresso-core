import { useContext } from 'react';
import invariant from 'invariant';

import { DatetimeContext } from '../services/context/DatetimeContext';
import { EntityContextProps } from '../services/context/types';

const useDatetimeContext = (): EntityContextProps => {
	const value = useContext<EntityContextProps>(DatetimeContext);

	invariant(value, 'useDatetimeContext must be used inside <DateTimeProvider> component');

	return value;
};
export default useDatetimeContext;
