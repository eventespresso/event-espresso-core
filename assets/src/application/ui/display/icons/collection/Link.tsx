import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Link = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.LINK} ref={ref} />
));

Link.displayName = 'Link';

export default Link;
