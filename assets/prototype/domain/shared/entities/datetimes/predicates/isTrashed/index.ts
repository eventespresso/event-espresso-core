/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/data/types';

const isTrashed = ({ isTrashed }: Datetime): boolean => is(Boolean, isTrashed) && isTrashed;

export default isTrashed;
