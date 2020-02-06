import React, { useMemo } from 'react';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

type voidFn = () => void;

interface SearchInputProps {
	listId: string;
	searchText: string;
	setSearchText: voidFn;
}

const SearchInput: React.FC<SearchInputProps> = ({ listId, searchText, setSearchText }) =>
	useMemo(() => {
		return typeof setSearchText === 'function' ? (
			<TextControl
				id={`ee-search-text-${listId}`}
				label={__('search')}
				className='ee-entity-list-filter-bar-search'
				value={searchText}
				onChange={setSearchText}
			/>
		) : null;
	}, [listId, searchText, setSearchText]);

export default SearchInput;
