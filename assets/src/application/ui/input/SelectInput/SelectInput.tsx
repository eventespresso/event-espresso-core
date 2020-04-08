import React from 'react';

import { Select, SelectProps } from '@infraUI/inputs';

import { withLabel, withLabelProps, withTooltipProps } from '@appDisplay/index';

interface SelectInputProps extends SelectProps, Partial<withLabelProps>, Partial<withTooltipProps> {}

const SelectInput: React.FC<SelectInputProps> = React.memo(({ id, ...rest }) => {
	const htmlId = id ? `ee-select-input-${id}` : null;

	return <Select id={htmlId} {...rest} />;
});

export default withLabel(SelectInput);
