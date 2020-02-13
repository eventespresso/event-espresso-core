import React from 'react';

import { SectionProps } from './types';
import RenderFields from './RenderFields';

const RenderSection: React.FC<SectionProps> = ({ name, title, fields, addSectionToFieldNames }) => {
	return (
		<div className='section-wrapper'>
			<div className='section-heading'>
				<h3>{title}</h3>
			</div>
			<div className='section-body'>
				<RenderFields fields={fields} namespace={addSectionToFieldNames ? name : null} />
			</div>
		</div>
	);
};

export default RenderSection;
