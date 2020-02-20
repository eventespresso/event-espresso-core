import { Datetime } from '@edtrServices/apollo/types';

const getBackgroundColorClass = (DateTimeEntity) => {
	return `ee-status-background-color-${status(DateTimeEntity)}`;
};

export default getBackgroundColorClass;
