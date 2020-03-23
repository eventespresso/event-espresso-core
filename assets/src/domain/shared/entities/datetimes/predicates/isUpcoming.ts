import { parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo/types';
import { diff, isBooleanTrue } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';

const isUpcoming = (date: Datetime): boolean =>
	isBooleanTrue(date.isUpcoming) || diff('seconds', parseISO(date.startDate), now) > 0;

export default isUpcoming;
