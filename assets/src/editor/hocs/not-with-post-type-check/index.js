/**
 * External Imports
 */
import { some, castArray } from 'lodash';
import { withSelect } from '@wordpress/data';

/**
 * A component with renders its own children oly if the current editor post type
 * is not one of the given `excludedPostTypeSlugs` prop.
 *
 * @param {string} postType
 * @param {WPElement} children
 * @param {(string|string[])} excludedPostTypeSlugs
 * @return {?WPElement} Rendered element or null.
 * @constructor
 */
export function NotWithPostTypeCheck( {
	postType,
	children,
	excludedPostTypeSlugs,
} ) {
	let isExcluded = false;
	if ( postType ) {
		isExcluded = some(
			castArray( excludedPostTypeSlugs ),
			( type ) => postType === type
		);
	}
	if ( isExcluded ) {
		return null;
	}

	return children;
}

export default withSelect( ( select ) => {
	const { getEditedPostAttribute } = select( 'core/editor' );
	return {
		postType: getEditedPostAttribute( 'type' ),
	};
} )( NotWithPostTypeCheck );
