/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../../prototype/domain/eventEditor/data/types';

const validStatus = ({ status }: Datetime): boolean => {
	return is(String, status);
};

export default validStatus;
