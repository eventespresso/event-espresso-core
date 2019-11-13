/**
 * External imports
 */
import PropTypes from 'prop-types';
import { withInstanceId } from '@wordpress/compose';
import { Fragment, useMemo, useState } from '@wordpress/element';
import { IconButton } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import useEntityListFilterStateSetters
	from './use-entity-list-filter-state-setters';
import Collapsible from './collapsible';
import './style.css';

/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 *
 * @param {string} listId
 * @param {string} instanceId
 * @param {Object} entityFilters additional entity specific filters
 * @param {string} searchText
 * @param {number} perPage
 * @param {string} view
 * @return {Object} EntityListFilterBar
 */
const EntityListFilterBar = ( {
	listId: id,
	instanceId,
	entityFilters = null,
	searchText = '',
	perPage = 6,
	view = 'grid',
} ) => {
	const listId = id ? id : 'entity-list-' + instanceId;
	const {
		setSearchText,
		setPerPage,
		setListView,
		setGridView,
	} = useEntityListFilterStateSetters( listId );

	const [ showEntityFilters, setShowEntityFilters ] = useState( false );
	const toggleEntityFilters = () => setShowEntityFilters( !showEntityFilters );

	const listViewButton = useMemo( () => (
		<Fragment>
			<label
				className="screen-reader-text"
				htmlFor={ `ee-list-view-btn-${ listId }` }>
				{ __( 'list view', 'event_espresso' ) }
			</label>
			<IconButton
				id={ `ee-list-view-btn-${ listId }` }
				className={
					view === 'list' ?
						'ee-filter-bar-filter ee-active-filters' :
						'ee-filter-bar-filter'
				}
				icon="list-view"
				tooltip={ __( 'list view', 'event_espresso' ) }
				onClick={ setListView }
			/>
		</Fragment>
	), [ listId, view, setListView ] );

	const gridViewButton = useMemo( () => (
		<Fragment>
			<label
				className="screen-reader-text"
				htmlFor={ `ee-grid-view-btn-${ listId }` }>
				{ __( 'list view', 'event_espresso' ) }
			</label>
			<IconButton
				id={ `ee-grid-view-btn-${ listId }` }
				className={
					view === 'grid' ?
						'ee-filter-bar-filter ee-active-filters' :
						'ee-filter-bar-filter'
				}
				icon="grid-view"
				tooltip={ __( 'grid view', 'event_espresso' ) }
				onClick={ setGridView }
			/>
		</Fragment>
	), [ listId, view, setGridView ] );

	const showFiltersButton = useMemo( () => (
		<Fragment>
			<label
				className="screen-reader-text"
				htmlFor={ `ee-grid-filter-btn-${ listId }` }>
				{ __( 'show filters', 'event_espresso' ) }
			</label>
			<IconButton
				id={ `ee-grid-filter-btn-${ listId }` }
				icon="filter"
				tooltip={ __( 'filter', 'event_espresso' ) }
				onClick={ toggleEntityFilters }
				className={
					showEntityFilters ?
						'ee-filter-bar-filter ee-active-filters' :
						'ee-filter-bar-filter'
				}
			/>
		</Fragment>
	), [ listId, toggleEntityFilters ] );

	return (
		<div className="ee-entity-list-filter-bar-wrapper">
			<div className="ee-filter-bar-filter-main">
				{ listViewButton }
				{ gridViewButton }
				{ showFiltersButton }
			</div>

			<Collapsible
				entityFilters={ entityFilters }
				listId={ listId }
				perPage={ perPage }
				searchText={ searchText }
				setPerPage={ setPerPage }
				setSearchText={ setSearchText }
				showEntityFilters={ showEntityFilters }
			/>
		</div>
	);
};

EntityListFilterBar.propTypes = {
	listId: PropTypes.string.isRequired,
	defaultView: PropTypes.string,
	defaultPerPage: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	entityFilters: PropTypes.object,
};

export default withInstanceId( EntityListFilterBar );
