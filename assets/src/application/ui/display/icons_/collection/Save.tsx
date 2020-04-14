import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Save = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.SAVE} ref={ref} />
));

Save.displayName = 'Save';

export default Save;
