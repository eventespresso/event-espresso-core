/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const isTrashed = ({ isDeleted }: Datetime): boolean => is(Boolean, isDeleted) && isDeleted;

export default isTrashed;
