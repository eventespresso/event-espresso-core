import React from 'react';

import { Switch } from '@infraUI/inputs';
import { FieldRendererProps } from '../types';

const SwitchField: React.FC<FieldRendererProps> = ({ input, meta: { error, submitError }, ...rest }) => {
	return <Switch {...input} isChecked={Boolean(input.value)} isInvalid={error || submitError} {...rest} />;
};

export default SwitchField;
