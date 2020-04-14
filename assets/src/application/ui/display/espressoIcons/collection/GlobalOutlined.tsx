import React from 'react';

import { EspressoIconProps, Icon } from '../types';
import EspressoIcon from '../EspressoIcon';

const GlobalOutlined = React.forwardRef<SVGSVGElement, Partial<EspressoIconProps>>((props, ref) => (
	<EspressoIcon {...props} name={Icon.GLOBALOUTLINED} ref={ref} />
));

GlobalOutlined.displayName = 'GlobalOutlined';

export default GlobalOutlined;
