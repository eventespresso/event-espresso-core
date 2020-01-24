import { useContext } from 'react';
import invariant from 'invariant';

import { DateTimeContext } from '../context/DateTimeProvider';
import { EntityContextProps } from '../context/types';

const useDatetimeContext = (): EntityContextProps => {
	const value = useContext<EntityContextProps>(DateTimeContext);

	invariant(value, 'useDatetimeContext must be used inside <DateTimeProvider> component');

	return value;
};
export default useDatetimeContext;
