import React from 'react';

import { DetailsSeparatorProps } from './types';

const DetailsSeparator: React.FC<DetailsSeparatorProps> = ({ last = false }) =>
	!last && <div role='separator' className='ee-entity-details-separator'></div>;

export default DetailsSeparator;
