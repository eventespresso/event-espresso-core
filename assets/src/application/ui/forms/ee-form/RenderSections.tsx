import React from 'react';

import { RenderSectionsProps } from './types';
import RenderSection from './RenderSection';

const RenderSections: React.FC<RenderSectionsProps> = ({ sections }) => {
	return (
		<div className='sections-wrapper'>
			{sections.map((section, key) => (
				<RenderSection key={key} {...section} />
			))}
		</div>
	);
};

export default RenderSections;
