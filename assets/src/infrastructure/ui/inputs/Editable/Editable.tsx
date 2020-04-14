import React from 'react';
import { Editable as ChakraEditable, EditableInput, EditablePreview, PseudoBox } from '@chakra-ui/core';

import { EditableProps } from './types';

const Editable: React.FC<EditableProps> = ({ editableInputProps, ...props }) => {
	return (
		<ChakraEditable {...props}>
			<EditablePreview />
			<EditableInput {...editableInputProps} />
		</ChakraEditable>
	);
};

export default Editable;
