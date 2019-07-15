/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

const DEFAULT_EMPTY_ARRAY = [];

const withFilteredDateEntities = ( includePaged = false ) => createHigherOrderComponent(
	withSelect(
		( select ) => {
			const store = select( 'eventespresso/filter-state' );
			const { getEntitiesByIds } = select( 'eventespresso/core' );
			return {
				filteredDateEntities: includePaged ?
					getEntitiesByIds(
						'datetime',
						store.getFilter(
							'event-editor-dates-list',
							'filteredPagedDateIds',
							DEFAULT_EMPTY_ARRAY
						)
					) :
					getEntitiesByIds(
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
