import { isNil } from 'ramda';
import { parseISO } from 'date-fns';

import { diff } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';

const switchTenseForDate = (
	date: Date | null,
	textForPastDate: string | null,
	textForFutureDate: string | null
): string | null => {
	if (isNil(date) || isNil(textForPastDate) || isNil(textForFutureDate)) {
		return null;
	}

	return diff('minutes', date, now) < 0 ? textForPastDate : textForFutureDate;
};

export default switchTenseForDate;
