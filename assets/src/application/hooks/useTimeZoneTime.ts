import { path } from 'ramda';

import useConfig from '../services/config/useConfig';
import { localToUtc, utcToLocal } from '../utilities/date';

type DateFn = (date: Date | string | number) => Date;

interface TimeZoneTime {
	localTimeToUtc: DateFn;
	utcToLocalTime: DateFn;
}

const useTimeZoneTime = (): TimeZoneTime => {
	const config = useConfig();

	const timezone = path<string>(['config', 'timezone', 'name'], config);

	const localTimeToUtc: DateFn = (date) => {
		return localToUtc(date, timezone);
	};

	const utcToLocalTime: DateFn = (isoDate) => {
		return utcToLocal(isoDate, timezone);
	};

	return {
		localTimeToUtc,
		utcToLocalTime,
	};
};

export default useTimeZoneTime;
