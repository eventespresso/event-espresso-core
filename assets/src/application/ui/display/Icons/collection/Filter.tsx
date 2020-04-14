import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Filter = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.FILTER} ref={ref} />
));

Filter.displayName = 'Filter';

export default Filter;
