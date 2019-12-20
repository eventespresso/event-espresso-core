import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { useConfig } from '../services/config/useConfig';

const useTimeZoneTime = () => {
	const { timezone } = useConfig();

	const localTimeToUtc = (date: Date | string | number) => {
		return zonedTimeToUtc(date, timezone.name);
	};

	const utcToLocalTime = (isoDate: Date | string | number) => {
		return utcToZonedTime(isoDate, timezone.name);
	};

	return {
		localTimeToUtc,
		utcToLocalTime,
	};
};

export default useTimeZoneTime;
