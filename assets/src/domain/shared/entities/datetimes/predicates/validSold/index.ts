import { is } from 'ramda';

import { Datetime } from '../../../../../../../prototype/domain/eventEditor/data/types';

const validSold = ({ sold }: Datetime): boolean => {
	return is(Number, sold);
};

export default validSold;
