import React from 'react';

import { EspressoIconProps, Icon } from '../types';
import EspressoIcon from '../EspressoIcon';

const More = React.forwardRef<SVGSVGElement, Partial<EspressoIconProps>>((props, ref) => (
	<EspressoIcon {...props} name={Icon.MORE} ref={ref} />
));

More.displayName = 'More';

export default More;
