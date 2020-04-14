import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const Edit = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.EDIT} ref={ref} />
));

Edit.displayName = 'Edit';

export default Edit;
