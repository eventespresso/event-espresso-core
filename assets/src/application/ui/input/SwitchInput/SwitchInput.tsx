import React from 'react';
import { SwitchProps } from 'antd/lib/switch';
import { Switch } from 'antd';

import { BaseInput } from '../BaseInput';

interface SwitchInputProps extends SwitchProps {
	label: string;
}

const SwitchInput: React.FC<SwitchInputProps> = React.memo(({ label, className, ...rest }) => {
	return (
		<BaseInput label={label} className={className}>
			<Switch {...rest} />
		</BaseInput>
	);
});

export default SwitchInput;
