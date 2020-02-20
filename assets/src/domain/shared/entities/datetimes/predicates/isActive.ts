import { is } from 'ramda';

import { Datetime } from '../../../../eventEditor/services/apollo/types';

const isActive = ({ isActive }: Datetime): boolean => {
	return is(Boolean, isActive) && isActive;
};

export default isActive;
