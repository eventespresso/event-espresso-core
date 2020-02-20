import { Datetime } from '../../../../eventEditor/services/apollo/types';

import capacityAtOrAbove from './capacityAtOrAbove';
import { isTrashed } from '../../../services/predicates';
import validStatus from './validStatus';

const isSoldOut = (date: Datetime): boolean => {
	return !isTrashed(date) && ((validStatus(date) && date.isSoldOut) || capacityAtOrAbove(date, 100));
};

export default isSoldOut;
