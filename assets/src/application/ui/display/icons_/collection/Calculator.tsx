import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Calculator = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.CALCULATOR} ref={ref} />
));

Calculator.displayName = 'Calculator';

export default Calculator;
