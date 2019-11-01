/**
 * External imports
 */
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { withInstanceId } from '@wordpress/compose';
import { useMemo, Fragment } from '@wordpress/element';
import { IconButton, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import useEntityListFilterStateSetters
	from './use-entity-list-filter-state-setters';
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
	const searchInput = useMemo( () => {
		return isFunction( setSearchText ) ? (
			<TextControl
				id={ `ee-search-text-${ listId }` }
				label={ __( 'search', 'event_espresso' ) }
				className="ee-entity-list-filter-bar-search"
				value={ searchText }
				onChange={ setSearchText }
			/>
		) : null;
	}, [ listId, searchText, setSearchText ] );

	const perPageControl = useMemo( () => (
		<SelectControl
			id={ `ee-perPage-select-${ listId }` }
			label={ __( 'per page', 'event_espresso' ) }
			className="ee-entity-list-filter-bar-perPage-select"
			value={ perPage }
			options={ [
				{ value: 2, label: 2 },
				{ value: 6, label: 6 },
				{ value: 12, label: 12 },
				{ value: 24, label: 24 },
				{ value: 48, label: 48 },
			] }
			onChange={ setPerPage }
		/>
	), [ listId, perPage, setPerPage ] );

	const listViewButton = useMemo( () => (
		<Fragment>
			<label
				className="screen-reader-text"
				htmlFor={ `ee-list-view-btn-${ listId }` }>
				{ __( 'list view', 'event_espresso' ) }
			</label>
			<IconButton
				id={ `ee-list-view-btn-${ listId }` }
				className={ view === 'list' ? 'active-list' : '' }
				icon="editor-justify"
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
				className={ view === 'grid' ? 'active-list' : '' }
				icon="screenoptions"
				tooltip={ __( 'grid view', 'event_espresso' ) }
				onClick={ setGridView }
			/>
		</Fragment>
	), [ listId, view, setGridView ] );

	return (
		<div className="ee-entity-list-filter-bar-wrapper">
			<div className="ee-entity-list-filter-bar">
				{ entityFilters }
				<div className="ee-search-filter ee-filter-bar-filter">
					{ searchInput }
				</div>
			</div>
			<div className="ee-entity-list-view-bar">
				<div className="ee-per-page-filter ee-filter-bar-filter">
					{ perPageControl }
				</div>
				<div className="ee-view-filter ee-filter-bar-filter">
					{ listViewButton }
					{ gridViewButton }
				</div>
			</div>
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
