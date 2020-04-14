import React from 'react';

import { EspressoIconProps, Icon } from '../types';
import EspressoIcon from '../EspressoIcon';

const TableView = React.forwardRef<SVGSVGElement, Partial<EspressoIconProps>>((props, ref) => (
	<EspressoIcon {...props} name={Icon.TABLE_VIEW} ref={ref} />
));

TableView.displayName = 'TableView';

export default TableView;
