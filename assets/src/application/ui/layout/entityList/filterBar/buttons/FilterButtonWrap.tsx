import React from 'react';
import { withViewportMatch } from '@appDisplay/viewport';
import { __ } from '@wordpress/i18n';

import { FilterButtonWrapProps } from '../types';

const FilterButtonWrap: React.FC<FilterButtonWrapProps> = ({ children, id, isMobile, label }) => (
	<div className='ee-filter-bar__btn-wrap'>
		{children}
		{!isMobile && (
			<label className='ee-filter-btn-label' htmlFor={id}>
				{label}
			</label>
		)}
	</div>
);

export default withViewportMatch({ isMobile: '< small' })(FilterButtonWrap);
