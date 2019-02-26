/**
 * External imports
 */
import { isFunction } from 'lodash';
import { Component, Fragment } from '@wordpress/element';
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
			searchEntities = ( searchText, entities ) => {
				return searchText !== '' ?
					entities.filter( ( entity ) => {
						const entityName = entity.name ? entity.name : '';
						return entityName.toLowerCase().search(
							searchText.toLowerCase() ) !== -1;
					} ) :
					entities;
			};

			render() {
				let { entities } = this.props;
				const {
					searchText,
					setSearchText,
					perPage,
					view,
					setPerPage,
					setListView,
					setGridView,
					...otherProps
				} = this.props;
				entities = isFunction( setSearchText ) ?
					this.searchEntities( searchText, entities ) :
					entities;
				return (
					<Fragment>
						<EntityListFilterBar
							searchText={ searchText }
							setSearchText={ setSearchText }
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
