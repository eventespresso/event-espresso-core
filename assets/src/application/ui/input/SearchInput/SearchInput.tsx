import React from 'react';

import { TextInput, TextInputProps } from '@infraUI/inputs';

import { withLabel, withLabelProps, withTooltipProps } from '@appDisplay/index';

interface SearchInputProps extends TextInputProps, Partial<withLabelProps>, Partial<withTooltipProps> {
	searchText: string;
	setSearchText: (text?: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({ className, searchText, setSearchText, ...props }) => {
	const id = `ee-search-input-${props.id}`;

	return typeof setSearchText === 'function' ? (
		<TextInput
			{...props}
			id={id}
			className='ee-entity-list-filter-bar-search'
			value={searchText}
			onChangeValue={setSearchText}
		/>
	) : null;
});

export default withLabel(SearchInput);
