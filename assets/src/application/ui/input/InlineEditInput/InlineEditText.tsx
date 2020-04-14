import React from 'react';

import { Editable, EditableProps } from '@infraUI/inputs';

const InlineEditText: React.FC<EditableProps> = (props) => {
	return <Editable {...props} />;
};

export default InlineEditText;
