import { parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo/types';
import { diff, isBooleanTrue } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';

const isExpired = (date: Datetime): boolean =>
	isBooleanTrue(date.isExpired) || diff('seconds', parseISO(date.endDate), now) < 0;

export default isExpired;
