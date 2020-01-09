/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';
import { Status } from '../../../eventEditor/data/date/types';

const validStatus = ({ status }: Datetime): boolean => {
	return is(String, status) && Object.values(Status).includes(status);
};

export default validStatus;
