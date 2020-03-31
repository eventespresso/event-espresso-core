import { isNil } from 'ramda';

import { diff } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';

const switchTenseForDate = (date: Date, textForPastDate: string, textForFutureDate: string): string | null => {
	if (isNil(date) || isNil(textForPastDate) || isNil(textForFutureDate)) {
		return null;
	}

	return diff('minutes', date, now) < 0 ? textForPastDate : textForFutureDate;
};

export default switchTenseForDate;
