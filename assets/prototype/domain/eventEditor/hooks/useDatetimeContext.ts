import { useContext } from 'react';
import invariant from 'invariant';

import { DateTimeContext, DateTimeContextProps } from '../context/DateTimeProvider';

const useDatetimeContext = (): DateTimeContextProps => {
	const value = useContext<DateTimeContextProps>(DateTimeContext);

	invariant(value, 'useDatetimeContext must be used inside <DateTimeProvider> component');

	return value;
};
export default useDatetimeContext;
