import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import useConfig from '../../application/services/config/useConfig';

const useZonedTime = () => {
	const { timezone } = useConfig();

	const zonedTimeToUtcCb = (date: Date | string | number) => {
		return zonedTimeToUtc(date, timezone);
	};

	const utcToZonedTimeCb = (isoDate: Date | string | number) => {
		return utcToZonedTime(isoDate, timezone);
	};

	return {
		zonedTimeToUtc: zonedTimeToUtcCb,
		utcToZonedTime: utcToZonedTimeCb,
	};
};

export default useZonedTime;
