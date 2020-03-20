import capacityAtOrAbove from './capacityAtOrAbove';
import { Datetime } from '@edtrServices/apollo/types';
import { isBooleanTrue } from '@appServices/utilities';

const isSoldOut = (date: Datetime): boolean => isBooleanTrue(date.isSoldOut) || capacityAtOrAbove(date, 100);

export default isSoldOut;
