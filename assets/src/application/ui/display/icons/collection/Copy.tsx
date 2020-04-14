import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Copy = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.COPY} ref={ref} />
));

Copy.displayName = 'Copy';

export default Copy;
