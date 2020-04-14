import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Calendar = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.CALENDAR} ref={ref} />
));

Calendar.displayName = 'Calendar';

export default Calendar;
