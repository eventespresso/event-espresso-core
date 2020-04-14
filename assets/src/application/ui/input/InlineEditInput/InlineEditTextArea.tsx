import React from 'react';

import { Editable, EditableProps } from '@infraUI/inputs';

const InlineEditTextArea: React.FC<EditableProps> = (props) => {
	const editableInputProps = {
		as: 'textarea',
	};

	return <Editable {...props} editableInputProps={editableInputProps} />;
};

export default InlineEditTextArea;
