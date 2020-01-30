import { is } from 'ramda';
import { Datetime } from '../../../../../eventEditor/data/types';

const isTrashed = ({ isTrashed }: Datetime): boolean => is(Boolean, isTrashed) && isTrashed;

export default isTrashed;
