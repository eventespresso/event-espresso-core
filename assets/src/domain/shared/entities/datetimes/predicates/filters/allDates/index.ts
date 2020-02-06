/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { DatetimeFilterFn } from '../types';
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';

const allDates: DatetimeFilterFn = (dates) => {
	const withoutTrashed = ({ isTrashed }: Datetime): boolean => {
		return is(Boolean, isTrashed) && !isTrashed;
	};

	return dates.filter(withoutTrashed);
};

export default allDates;
