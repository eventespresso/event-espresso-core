import { filter, compose, not, isNil } from 'ramda';

type Obj = { [key: string]: any };

const removeNullAndUndefined = <T>(filterable: T[] | Obj): T[] | Obj => filter(compose(not, isNil), filterable);

export default removeNullAndUndefined;
