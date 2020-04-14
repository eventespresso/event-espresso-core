import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const More = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.MORE} ref={ref} />
));

More.displayName = 'More';

export default More;
