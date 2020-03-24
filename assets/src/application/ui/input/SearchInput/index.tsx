import React from 'react';
import { __ } from '@wordpress/i18n';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import { BaseInput } from '../BaseInput';

interface SearchInputProps extends InputProps {
	searchText: string;
	setSearchText: (text?: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({ className, searchText, setSearchText, ...props }) => {
	const id = `ee-search-input-${props.id}`;

	return typeof setSearchText === 'function' ? (
		<BaseInput label={__('search')} id={id} className={className}>
			<Input
				{...props}
				id={id}
				className='ee-entity-list-filter-bar-search'
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onPressEnter={(e) => e.preventDefault()}
			/>
		</BaseInput>
	) : null;
});

export default SearchInput;
