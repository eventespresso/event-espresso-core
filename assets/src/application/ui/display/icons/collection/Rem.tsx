import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Rem = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.REM} ref={ref} />
));

Rem.displayName = 'Rem';

export default Rem;
