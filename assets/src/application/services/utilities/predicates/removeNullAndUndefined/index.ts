import { filter, compose, not, isNil } from 'ramda';

const removeNullAndUndefined = <T>(filterable: T): T => filter(compose(not, isNil), filterable);

export default removeNullAndUndefined;
