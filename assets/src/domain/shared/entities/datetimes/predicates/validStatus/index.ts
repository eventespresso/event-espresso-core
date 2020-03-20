import { is } from 'ramda';

import { Datetime } from '@edtrServices/apollo/types';

const validStatus = ({ status }: Datetime): boolean => is(String, status);

export default validStatus;
