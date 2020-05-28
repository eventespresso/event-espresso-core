import { is } from 'ramda';

/**
 * returns true if supplied value is a boolean AND is actually true
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isBooleanTrue = (maybeBoolean: any): boolean => is(Boolean, maybeBoolean) && maybeBoolean;

export default isBooleanTrue;
