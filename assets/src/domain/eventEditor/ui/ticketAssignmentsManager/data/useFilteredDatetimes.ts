import { useDatetimes } from '@edtrServices/apollo/queries';
import { useFilterState } from '../filters';
import { isTrashed } from '@sharedServices/predicates';
import inYearAndMonth from '@sharedEntities/datetimes/predicates/filters/inYearAndMonth';

const useFilteredDatetimes = () => {
	const { showTrashedDates, datesByMonth } = useFilterState();

	const datesInYearAndMonth = inYearAndMonth(datesByMonth);

	const allDates = useDatetimes();

	const datetimes = datesInYearAndMonth(allDates);

	if (showTrashedDates) {
		return datetimes;
	}

	return datetimes.filter((datetime) => !isTrashed(datetime));
};

export default useFilteredDatetimes;
