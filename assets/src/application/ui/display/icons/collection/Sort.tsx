import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Sort = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.SORT} ref={ref} />
));

Sort.displayName = 'Sort';

export default Sort;
