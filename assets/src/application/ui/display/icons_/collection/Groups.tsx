import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Groups = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.GROUPS} ref={ref} />
));

Groups.displayName = 'Groups';

export default Groups;
