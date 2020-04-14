import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Unlink = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.UNLINK} ref={ref} />
));

Unlink.displayName = 'Unlink';

export default Unlink;
