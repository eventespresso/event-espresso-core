import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Close = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.CLOSE} ref={ref} />
));

Close.displayName = 'Close';

export default Close;
