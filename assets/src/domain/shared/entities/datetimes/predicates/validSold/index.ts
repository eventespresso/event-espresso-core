import { is } from 'ramda';

import { Datetime } from '@edtrServices/apollo/types';

const validSold = ({ sold }: Datetime): boolean => {
	return is(Number, sold);
};

export default validSold;
