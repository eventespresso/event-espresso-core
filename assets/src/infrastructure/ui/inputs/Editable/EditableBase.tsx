import React, { forwardRef } from 'react';
import { Editable as ChakraEditable, EditableProps } from '@chakra-ui/core';

const EditableBase: React.FC<EditableProps> = forwardRef((props, ref) => <ChakraEditable {...props} ref={ref} />);

export default EditableBase;
