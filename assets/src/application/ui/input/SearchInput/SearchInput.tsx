import React from 'react';
import classNames from 'classnames';

import { TextInput, TextInputProps } from '@infraUI/inputs';
import { withLabel, withLabelProps, withTooltipProps } from '@appDisplay/index';

interface SearchInputProps extends TextInputProps, Partial<withLabelProps>, Partial<withTooltipProps> {
	searchId: string;
	searchText: string;
	setSearchText: (text?: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchId, searchText, setSearchText, ...props }) => {
	const id = `ee-search-input-${searchId}`;
	const className = classNames('ee-input-base ee-input ee-search-input', props.className);

	return typeof setSearchText === 'function' ? (
		<TextInput {...props} id={id} className={className} value={searchText} onChangeValue={setSearchText} />
	) : null;
};

export default withLabel(SearchInput);
