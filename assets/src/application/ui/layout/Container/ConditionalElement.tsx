import React from 'react';
import type { ConditionalElementProps } from './types';

/**
 * An abstract container for laying out elements, but ONLY if they contain content
 */
const ConditionalElement: React.FC<ConditionalElementProps> = ({ children, className, tag, ...props }) => {
	const Tag = tag;
	return (
		children && (
			<Tag {...props} className={className}>
				{children}
			</Tag>
		)
	);
};

export default ConditionalElement;
