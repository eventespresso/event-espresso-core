import { isEqual } from 'date-fns';

const areEqual = (dateLeft: Date | number, dateRight: Date | number): boolean => {
	return isEqual(dateLeft, dateRight);
};

export default areEqual;
