import { parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo/types';
import { diff, isBooleanTrue } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';

const isActive = (date: Datetime): boolean =>
	isBooleanTrue(date.isActive) ||
	(diff('seconds', parseISO(date.startDate), now) < 0 && diff('seconds', parseISO(date.endDate), now) > 0);

export default isActive;
