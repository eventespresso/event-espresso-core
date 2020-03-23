import { is } from 'ramda';

import { Datetime } from '@edtrServices/apollo/types';

/**
 * @param {Object} date event object
 * @return {boolean} true if status property is valid
 */
const validFiniteCapacityLimit = ({ capacity }: Datetime): boolean => {
	return is(Number, capacity) && isFinite(capacity);
};

export default validFiniteCapacityLimit;
