import { useContext } from 'react';

import { DateTimeContext, DateTimeContextProps } from '../context/DateTimeProvider';

const useDatetimeContext = (): DateTimeContextProps => {
	const value = useContext<DateTimeContextProps>(DateTimeContext);
	if (!value) {
		throw new Error('useDatetimeContext must be used inside <DateTimeProvider> component');
	}
	return value;
};
export default useDatetimeContext;
