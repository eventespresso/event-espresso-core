/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const validSold = ({ sold }: Datetime): boolean => {
	return is(String, sold) || is(Number, sold); // TODO: rethink this.
};

export default validSold;
