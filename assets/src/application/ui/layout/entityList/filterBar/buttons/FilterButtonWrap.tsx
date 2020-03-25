import React from 'react';
import { __ } from '@wordpress/i18n';
import { withViewportMatch } from '@wordpress/viewport';

import { FilterButtonWrapProps } from '../types';

const FilterButtonWrap: React.FC<FilterButtonWrapProps> = ({ children, id, isMobile, label }) => {
	return (
		<div className='ee-filter-bar__btn-wrap'>
			{children}
			{!isMobile && (
				<label className='ee-filter-btn-label' htmlFor={id}>
					{label}
				</label>
			)}
		</div>
	);
};

export default withViewportMatch({ isMobile: '< small' })(FilterButtonWrap);
