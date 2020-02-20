import { is } from 'ramda';

import { Datetime } from '../../../../eventEditor/services/apollo/types';

const isUpcoming = ({ isUpcoming }: Datetime): boolean => {
	return is(Boolean, isUpcoming) && isUpcoming;
};

export default isUpcoming;
