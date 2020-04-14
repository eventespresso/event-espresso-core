import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Rotate = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.ROTATE} ref={ref} />
));

Rotate.displayName = 'Rotate';

export default Rotate;
