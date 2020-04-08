import React from 'react';

import { TextArea as AdaptedTextArea } from '@infraUI/inputs';
import { FieldRendererProps } from '../types';

const TextArea: React.FC<FieldRendererProps> = ({ input, meta: { error, submitError }, ...rest }) => {
	return <AdaptedTextArea {...input} isInvalid={error || submitError} {...rest} />;
};

export default TextArea;
