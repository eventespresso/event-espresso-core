import { Datetime } from '@edtrServices/apollo/types';
import { isBooleanTrue } from '@appServices/utilities';

const isSoldOut = (date: Datetime): boolean =>
	isBooleanTrue(date.isSoldOut) || (isFinite(date.capacity) && date.capacity > -1 && date.capacity <= date.sold);

export default isSoldOut;
