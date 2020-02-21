import { Datetime } from '../../../../eventEditor/services/apollo/types';

import capacityAtOrAbove from './capacityAtOrAbove';
import { isValidOrTrashed } from '../../../services/predicates';
import validStatus from './validStatus';

const isSoldOut = (date: Datetime): boolean => {
	return isValidOrTrashed(date) && ((validStatus(date) && date.isSoldOut) || capacityAtOrAbove(date, 100));
};

export default isSoldOut;
