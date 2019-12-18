/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';
import { now } from './filters';

interface IisOnSale {
	startDate: Date;
	endDate: Date;
}

const isOnSale = ({ startDate, endDate }: IisOnSale): boolean => {
	return differenceInMinutes(startDate, now) < 0 && differenceInMinutes(endDate, now) > 0;
};

export default isOnSale;
