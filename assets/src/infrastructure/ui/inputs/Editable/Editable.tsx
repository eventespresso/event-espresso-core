import React, { forwardRef } from 'react';
import { Editable as ChakraEditable, EditableInput, EditablePreview } from '@chakra-ui/core';

import { EditableProps } from './types';

const Editable: React.FC<EditableProps> = forwardRef(({ editableInputProps, ...props }, ref) => {
	return (
		<ChakraEditable {...props} ref={ref}>
			<EditablePreview />
			<EditableInput {...editableInputProps} />
		</ChakraEditable>
	);
});

export default Editable;
