/**
 * External imports
 */
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { Component, Fragment } from '@wordpress/element';
import { IconButton, SelectControl, TextControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 *
 * @param {Object} entityFilters additional entity specific filters
 * @param {number} perPage
 * @param {string} view
 * @param {Function} setPerPage callback for perPage input
 * @param {Function} setListView callback for list view icon button
 * @param {Function} setGridView callback for grid view icon button
 * @return {Object} EntityListFilterBar
 */
class EntityListFilterBar extends Component {
	static propTypes = {
		entityFilters: PropTypes.object,
		perPage: PropTypes.number.isRequired,
		view: PropTypes.string.isRequired,
		setPerPage: PropTypes.func.isRequired,
		setListView: PropTypes.func.isRequired,
		setGridView: PropTypes.func.isRequired,
	};

	/**
	 * @param {string} searchText
	 * @param {Function} setSearchText
	 * @return {Object} rendered search input
	 */
	search = ( searchText, setSearchText ) => {
		return isFunction( setSearchText ) ? (
			<Fragment>
				<TextControl
					label={ __( 'search', 'event_espresso' ) }
					className="ee-entity-list-filter-bar-search"
					value={ searchText }
					onChange={ setSearchText }
				/>
			</Fragment>
		) : null;
	};

	/**
	 * @param {string} perPage
	 * @param {Function} setPerPage
	 * @return {Object} rendered perPage select input
	 */
	perPage = ( perPage, setPerPage ) => (
		<SelectControl
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
	);

	/**
	 * @param {string} view
	 * @param {Function} setListView
	 * @return {Object} rendered list view icon button
	 */
	listView = ( view, setListView ) => (
		<Fragment>
			<label
				className="screen-reader-text"
				htmlFor={ `ee-list-view-btn-${ this.props.instanceId }` }>
				{ __( 'list view', 'event_espresso' ) }
			</label>
			<IconButton
				id={ `ee-list-view-btn-${ this.props.instanceId }` }
				className={ view === 'list' ? 'active-list' : '' }
				icon="editor-justify"
				tooltip={ __( 'list view', 'event_espresso' ) }
				onClick={ setListView }
			/>
		</Fragment>
	);

	/**
	 * @param {string} view
	 * @param {Function} setGridView
	 * @return {Object} rendered grid view icon button
	 */
	gridView = ( view, setGridView ) => (
		<Fragment>
			<label
				className="screen-reader-text"
				htmlFor={ `ee-grid-view-btn-${ this.props.instanceId }` }>
				{ __( 'list view', 'event_espresso' ) }
			</label>
			<IconButton
				id={ `ee-grid-view-btn-${ this.props.instanceId }` }
				className={ view === 'grid' ? 'active-list' : '' }
				icon="screenoptions"
				tooltip={ __( 'grid view', 'event_espresso' ) }
				onClick={ setGridView }
			/>
		</Fragment>
	);

	/**
	 * @param {string} view
	 * @param {string} perPage
	 * @param {Function} setDefaultView
	 * @param {Function} setDefaultPerPage
	 * @return {Object} rendered grid view icon button
	 */
	saveSettings = ( view, perPage, setDefaultView, setDefaultPerPage ) => (
		<IconButton
			className={ 'ee-save-filter-settings' }
			icon={ 'admin-generic' }
			tooltip={ __(
				'click to save current "per page" and "view" settings',
				'event_espresso'
			) }
			onClick={ () => {
				setDefaultView( view );
				setDefaultPerPage( perPage );
			} }
		/>
	);

	render() {
		const {
			searchText = '',
			setSearchText,
			setPerPage,
			setListView,
			setGridView,
			defaultView,
			setDefaultView,
			defaultPerPage,
			setDefaultPerPage,
		} = this.props;
		let { perPage, view } = this.props;
		perPage = perPage || defaultPerPage;
		view = view || defaultView;
		const entityFilters = this.props.entityFilters ?
			this.props.entityFilters :
			null;
		return (
			<div className="ee-entity-list-filter-bar-wrapper">
				<div className="ee-entity-list-filter-bar">
					{ entityFilters }
					<div className="ee-search-filter ee-filter-bar-filter">
						{ this.search( searchText, setSearchText ) }
					</div>
				</div>
				<div className="ee-entity-list-view-bar">
					<div className="ee-per-page-filter ee-filter-bar-filter">
						{ this.perPage( perPage, setPerPage ) }
					</div>
					<div className="ee-view-filter ee-filter-bar-filter">
						{ this.listView( view, setListView ) }
						{ this.gridView( view, setGridView ) }
						{ this.saveSettings(
							view,
							perPage,
							setDefaultView,
							setDefaultPerPage
						) }
					</div>
				</div>
			</div>
		);
	}
}

export default withInstanceId( EntityListFilterBar );
