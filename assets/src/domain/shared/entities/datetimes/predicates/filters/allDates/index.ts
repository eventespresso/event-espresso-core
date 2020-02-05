/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const allDates = (dates: Datetime[]): Datetime[] | [] => {
	const withoutTrashed = ({ isTrashed }: Datetime): boolean => {
		return is(Boolean, isTrashed) && !isTrashed;
	};

	return dates.filter(withoutTrashed);
};

export default allDates;
