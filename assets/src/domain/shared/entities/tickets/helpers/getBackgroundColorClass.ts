import { Ticket } from '@edtrServices/apollo/types';
import status from './status';

const getBackgroundColorClass = (ticket: Ticket): string => {
	return `ee-status-background-color-${status(ticket)}`;
};

export default getBackgroundColorClass;
