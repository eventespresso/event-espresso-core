import status from './status';
import { Ticket } from '@edtrServices/apollo/types';

const getBackgroundColorClass = (ticket: Ticket): string => {
	return `ee-status-background-color-${status(ticket)}`;
};

export default getBackgroundColorClass;
