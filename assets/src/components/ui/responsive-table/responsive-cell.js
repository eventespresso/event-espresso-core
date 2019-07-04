/**
 * External imports
 */
import { Fragment } from '@wordpress/element';

/**
 * @function
 * @param {string} heading
 * @param {string} value
 * @return {Object} rendered headings row
 */
const ResponsiveCell = ( { heading = '', value = '' } ) => {
	return (
		<Fragment>
			<div aria-hidden
				className={ 'ee-rspnsv-table-mobile-only-column-header' }
			>
				{ heading }
			</div>
			<div className={ 'ee-rspnsv-table-mobile-only-column-value' } >
				{ value }
			</div>
		</Fragment>
	);
};

export default ResponsiveCell;
