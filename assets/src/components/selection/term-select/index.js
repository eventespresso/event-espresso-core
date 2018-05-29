/**
 * External dependencies
 */
import { unescape as unescapeString, repeat, flatMap, compact } from 'lodash';
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';

function getSelectOptions( terms, level = 0 ) {
	return flatMap( terms, ( term ) => [
		{
			value: term.slug,
			label: repeat( '\u00A0', level * 3 ) + unescapeString( term.name ),
		},
		...getSelectOptions( term.children, level + 1 ),
	] );
}

export const TermSelectControl = ( {
	selectedTerm,
	terms,
	label,
	noOptionLabel,
	onChange,
} ) => {
	const options = compact( [
		noOptionLabel && { value: '', label: noOptionLabel },
		...getSelectOptions( terms ),
	] );
	return (
		<SelectControl
			{ ...{ label, options, onChange } }
			value={ selectedTerm }
		/>
	);
};
