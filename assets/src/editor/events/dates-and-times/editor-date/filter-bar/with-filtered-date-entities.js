/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

const DEFAULT_EMPTY_ARRAY = [];

const withFilteredDateEntities = createHigherOrderComponent(
	withSelect(
		( select ) => {
			const store = select( 'eventespresso/filter-state' );
			const { getEntitiesByIds } = select( 'eventespresso/core' );
			return {
				filteredDateEntities: getEntitiesByIds(
					'datetime',
					store.getFilter(
						'event-editor-dates-list',
						'filteredDateIds',
						DEFAULT_EMPTY_ARRAY
					)
				),
			};
		}
	),
	'withFilteredDateEntities'
);

export default withFilteredDateEntities;
