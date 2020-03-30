import React from 'react';
import { SwitchProps } from 'antd/lib/switch';
import { Switch } from 'antd';

import { withLabel, withLabelProps, withTooltipProps } from '@appDisplay/index';

interface SwitchInputProps extends SwitchProps, Partial<withLabelProps>, Partial<withTooltipProps> {}

const SwitchInput: React.FC<SwitchInputProps> = React.memo((props) => {
	return <Switch {...props} />;
});

export default withLabel(SwitchInput);
