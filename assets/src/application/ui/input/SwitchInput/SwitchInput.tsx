import React from 'react';
import { SwitchProps } from 'antd/lib/switch';
import { Switch } from 'antd';

import { withLabel } from '@application/ui/input';

interface SwitchInputProps extends SwitchProps {
	label: string;
}

const SwitchInput: React.FC<SwitchInputProps> = React.memo(({ label, className, ...rest }) =>
	withLabel(<Switch {...rest} />)({ label })
);

export default SwitchInput;
