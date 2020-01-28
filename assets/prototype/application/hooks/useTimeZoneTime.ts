import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import useConfig from '../services/config/useConfig';

type DateFn = (date: Date | string | number) => Date;

interface TimeZoneTime {
	localTimeToUtc: DateFn;
	utcToLocalTime: DateFn;
}

const useTimeZoneTime = (): TimeZoneTime => {
	const { config } = useConfig();

	const localTimeToUtc: DateFn = (date) => {
		return zonedTimeToUtc(date, config.timezone.name);
	};

	const utcToLocalTime: DateFn = (isoDate) => {
		return utcToZonedTime(isoDate, config.timezone.name);
	};

	return {
		localTimeToUtc,
		utcToLocalTime,
	};
};

export default useTimeZoneTime;
