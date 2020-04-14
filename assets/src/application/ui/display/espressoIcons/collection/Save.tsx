import React from 'react';

import { EspressoIconProps, Icon } from '../types';
import EspressoIcon from '../EspressoIcon';

const Save = React.forwardRef<SVGSVGElement, Partial<EspressoIconProps>>((props, ref) => (
	<EspressoIcon {...props} name={Icon.SAVE} ref={ref} />
));

Save.displayName = 'Save';

export default Save;
