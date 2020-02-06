/**
 * External dependencies
 */
import { differenceInMinutes, parseISO } from 'date-fns';
import { now } from './filters';
import { Ticket } from '../../../../eventEditor/services/apollo/types';

const isOnSale = ({ startDate, endDate }: Ticket): boolean => {
	return differenceInMinutes(parseISO(startDate), now) < 0 && differenceInMinutes(parseISO(endDate), now) > 0;
};

export default isOnSale;
