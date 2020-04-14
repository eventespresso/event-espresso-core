import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const GlobalOutlined = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.GLOBALOUTLINED} ref={ref} />
));

GlobalOutlined.displayName = 'GlobalOutlined';

export default GlobalOutlined;
