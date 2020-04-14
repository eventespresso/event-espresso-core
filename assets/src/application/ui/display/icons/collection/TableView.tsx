import React from 'react';

import { IconProps, IconName } from '../types';
import Icon from '../Icon';

const TableView = React.forwardRef<SVGSVGElement, Partial<IconProps>>((props, ref) => (
	<Icon {...props} name={IconName.TABLE_VIEW} ref={ref} />
));

TableView.displayName = 'TableView';

export default TableView;
