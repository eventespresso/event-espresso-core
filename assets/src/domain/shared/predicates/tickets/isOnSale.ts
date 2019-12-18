/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';

interface IisOnSale {
	startDate: Date;
	endDate: Date;
}

const isOnSale = ({ startDate, endDate }: IisOnSale): boolean => {
	const now = new Date();

	return differenceInMinutes(startDate, now) < 0 && differenceInMinutes(endDate, now) > 0;
};

export default isOnSale;
