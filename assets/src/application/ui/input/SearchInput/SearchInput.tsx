import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import { withLabel, withLabelProps, withTooltipProps } from '@appDisplay/index';

interface SearchInputProps extends InputProps, Partial<withLabelProps>, Partial<withTooltipProps> {
	searchText: string;
	setSearchText: (text?: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({ className, searchText, setSearchText, ...props }) => {
	const id = `ee-search-input-${props.id}`;

	return typeof setSearchText === 'function' ? (
		<Input
			{...props}
			id={id}
			className='ee-entity-list-filter-bar-search'
			value={searchText}
			onChange={(e) => setSearchText(e.target.value)}
			onPressEnter={(e) => e.preventDefault()}
		/>
	) : null;
});

export default withLabel(SearchInput);
