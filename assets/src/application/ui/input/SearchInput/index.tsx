import React from 'react';
import { __ } from '@wordpress/i18n';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import { withLabel } from '@application/ui/input';

interface SearchInputProps extends InputProps {
	searchText: string;
	setSearchText: (text?: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({ className, searchText, setSearchText, ...props }) => {
	const id = `ee-search-input-${props.id}`;
	const label = __('search');

	const LabeledInput = withLabel(
		<Input
			{...props}
			id={id}
			className='ee-entity-list-filter-bar-search'
			value={searchText}
			onChange={(e) => setSearchText(e.target.value)}
			onPressEnter={(e) => e.preventDefault()}
		/>
	)({ id, label });

	return typeof setSearchText === 'function' ? LabeledInput : null;
});

export default SearchInput;
