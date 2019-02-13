/**
 * External imports
 */
import { Component, Fragment } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { default as EntityListFilterBar } from './entity-list-filter-bar';

/**
 * withEntityListFilterBar
 * Higher-Order-Component that wraps an EntityList component
 * for changing how the EntityList is viewed
 *
 * @return {Object} EntityList with added EntityListFilterBar
 */
export default createHigherOrderComponent(
	( EntityList ) => {
		return class extends Component {
			render() {
				const {
					entities,
					perPage,
					view,
					setPerPage,
					setListView,
					setGridView,
					...otherProps
				} = this.props;
				return (
					<Fragment>
						<EntityListFilterBar
							perPage={ perPage }
							view={ view }
							setPerPage={ setPerPage }
							setListView={ setListView }
							setGridView={ setGridView }
						/>
						<EntityList
							entities={ entities }
							entitiesPerPage={ perPage }
							view={ view }
							noResultsText={
								__(
									'no results found (try changing filters)',
									'event_espresso'
								)
							}
							{ ...otherProps }
						/>
					</Fragment>
				);
			}
		};
	},
	'withEntityListFilterBar'
);
