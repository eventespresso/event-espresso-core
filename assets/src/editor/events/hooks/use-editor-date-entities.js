/**
 * External imports
 */
import { useSelect } from '@wordpress/data';

/**
 * A hook for retrieving all the date entities currently in the
 * eventespresso/core data store.
 *
 * @return { BaseEntity[] } An array of Datetime entities.
 */
const useEditorDateEntities = () => {
	return useSelect( ( select ) => {
		return select( 'eventespresso/core' ).getDatetimes();
	} );
};

export default useEditorDateEntities;
