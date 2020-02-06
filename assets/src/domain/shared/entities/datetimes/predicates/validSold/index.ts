import { is } from 'ramda';

import { Datetime } from '../../../../../eventEditor/services/apollo/types';

const validSold = ({ sold }: Datetime): boolean => {
	return is(Number, sold);
};

export default validSold;
