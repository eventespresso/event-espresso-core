import React from 'react';

import { EspressoIconProps, Icon } from '../types';
import EspressoIcon from '../EspressoIcon';

const Edit = React.forwardRef<SVGSVGElement, Partial<EspressoIconProps>>((props, ref) => (
	<EspressoIcon {...props} name={Icon.EDIT} ref={ref} />
));

Edit.displayName = 'Edit';

export default Edit;
