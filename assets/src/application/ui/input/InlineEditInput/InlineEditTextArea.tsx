import React from 'react';

import { Editable, EditableProps, EditableInputProps } from '@infraUI/inputs';

const InlineEditTextArea: React.FC<EditableProps> = (props) => {
	const editableInputProps: EditableInputProps = {
		as: 'textarea',
	};

	return <Editable {...props} editableInputProps={editableInputProps} />;
};

export default InlineEditTextArea;
