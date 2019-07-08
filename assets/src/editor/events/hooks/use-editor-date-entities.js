import { useSelect } from '@wordpress/data';

const useEditorDateEntities = () => {
	return useSelect( ( select ) => {
		return select( 'eventespresso/core' ).getDatetimes();
	} );
};

export default useEditorDateEntities;
