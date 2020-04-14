import React from 'react';

import { EditableWithCustomControls, EditableProps } from '@infraUI/inputs';

const InlineEditHeading: React.FC<EditableProps> = ({ ...props }) => {
	return <EditableWithCustomControls {...props} />;
};

export default InlineEditHeading;
