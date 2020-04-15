import React, { forwardRef } from 'react';
import { EditableInput as ChakraEditableInput, PseudoBoxProps } from '@chakra-ui/core';

const EditableInput: React.FC<PseudoBoxProps> = forwardRef((props, ref) => (
	<ChakraEditableInput {...props} ref={ref} />
));

export default EditableInput;
