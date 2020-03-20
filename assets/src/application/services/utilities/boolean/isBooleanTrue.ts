import { is } from 'ramda';

/**
 * returns true if supplied value is a boolean AND is actually true
 */
const isBooleanTrue = (maybeBoolean: boolean): boolean => is(Boolean, maybeBoolean) && maybeBoolean;

export default isBooleanTrue;
