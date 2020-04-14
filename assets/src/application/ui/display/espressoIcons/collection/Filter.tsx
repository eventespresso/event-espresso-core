import React from 'react';

import { EspressoIconProps, Icon } from '../types';
import EspressoIcon from '../EspressoIcon';

const Filter = React.forwardRef<SVGSVGElement, Partial<EspressoIconProps>>((props, ref) => (
	<EspressoIcon {...props} name={Icon.FILTER} ref={ref} />
));

Filter.displayName = 'Filter';

export default Filter;
