import { Trashable } from '@dataServices/types';
import isTrashed from '../isTrashed';

const isValidOrTrashed = <T extends Trashable>(entity: T, includeTrashed?: boolean): boolean => {
	return includeTrashed || (!includeTrashed && !isTrashed(entity));
};

export default isValidOrTrashed;
