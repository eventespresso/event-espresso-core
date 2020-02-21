import { Datetime } from '@edtrServices/apollo/types';
import status from './status';

const getBackgroundColorClass = (date: Datetime): string => {
	return `ee-status-background-color-${status(date)}`;
};

export default getBackgroundColorClass;
