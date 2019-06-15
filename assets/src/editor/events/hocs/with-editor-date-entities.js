import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

export default createHigherOrderComponent(
	withSelect( ( select ) => {
		return {
			dateEntities: select( 'eventespresso/core' )
				.getDatetimes(),
		};
	} ),
	'withEditorDateEntities'
);
