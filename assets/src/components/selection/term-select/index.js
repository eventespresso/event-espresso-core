/**
 * External dependencies
 */
import {
	unescape,
	repeat,
	flatMap,
	compact,
	isEmpty,
} from 'lodash';
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';

function getSelectOptions( terms, level = 0 ) {
	return flatMap( terms, ( term ) => [
		{
			value: term.slug,
			label: repeat( '\u00A0', level * 3 ) + unescape( term.name ),
		},
		...getSelectOptions( term.children, level + 1 ),
	] );
}

const TermSelectControl = ( {
	selectedTerm,
	terms,
	label,
	noSelectionLabel = __( 'Please make a selection', 'event_espresso' ),
	onChange,
} ) => {
	if ( !onChange || isEmpty( terms ) ) {
		return null;
	}
	const options = compact( [
		noSelectionLabel && { value: '', label: noSelectionLabel },
		...getSelectOptions( terms ),
	] );
	return (
		<SelectControl
			{ ...{ label, options, onChange } }
			value={ selectedTerm }
		/>
	);
};

TermSelectControl.propTypes = {
	selectedTerm: PropTypes.string,
	terms: PropTypes.arrayOf(
		PropTypes.shape( {
			slug: PropTypes.string.required,
			name: PropTypes.string.required,
			children: PropTypes.array,
		} ),
	),
	label: PropTypes.string,
	noSelectionLabel: PropTypes.string,
	onChange: PropTypes.func,
};

export default TermSelectControl;
