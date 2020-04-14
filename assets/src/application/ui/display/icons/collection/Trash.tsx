import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Trash = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.TRASH} ref={ref} />
));

Trash.displayName = 'Trash';

export default Trash;
