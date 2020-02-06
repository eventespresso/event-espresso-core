/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/services/apollo/types';

const validStatus = ({ status }: Datetime): boolean => {
	return is(String, status);
};

export default validStatus;
