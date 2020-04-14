import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Ticket = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.TICKET} ref={ref} />
));

Ticket.displayName = 'Ticket';

export default Ticket;
