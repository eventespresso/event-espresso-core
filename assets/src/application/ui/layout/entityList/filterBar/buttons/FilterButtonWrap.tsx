import React from 'react';
import { __ } from '@wordpress/i18n';

import { FilterButtonWrapProps } from '../types';

const FilterButtonWrap: React.FC<FilterButtonWrapProps> = ({ children, id, label }) => {
	return (
		<div className='ee-filter-bar-filter--btn--wrap'>
			{children}
			<label className='ee-filter-btn-label' htmlFor={id}>
				{label}
			</label>
		</div>
	);
};

export default FilterButtonWrap;
