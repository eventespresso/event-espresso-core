import { isEqual } from 'date-fns';

const datesAreEqual = (dateLeft: Date | number, dateRight: Date | number): boolean => {
	return isEqual(dateLeft, dateRight);
};

export default datesAreEqual;
