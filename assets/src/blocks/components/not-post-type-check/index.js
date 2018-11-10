/**
 * External Imports
 */
import { some, castArray } from 'lodash';
import { withSelect } from '@wordpress/data';

/**
 * A component with renders its own children oly if the current editor post type
 * is not one of the given `excludedPostTypeSlugs` prop.
 *
 * @param {?Object} postType
 * @param {WPElement} children
 * @param {(string|string[])} excludedPostTypeSlugs
 * @return {WPElement|null} Rendered element or null.
 * @constructor
 */
export function NotPostTypeCheck( {
	postType,
	children,
	excludedPostTypeSlugs,
} ) {
	let isExcluded = false;
	if ( postType ) {
		isExcluded = some(
			castArray( excludedPostTypeSlugs ),
			( type ) => postType.slug === type
		);
	}
	if ( isExcluded ) {
		return null;
	}

	return children;
}

export default withSelect( ( select ) => {
	const { getEditedPostAttribute } = select( 'core/editor' );
	const { getPostType } = select( 'core' );
	return {
		postType: getPostType( getEditedPostAttribute( 'type' ) ),
	};
} )( NotPostTypeCheck );
