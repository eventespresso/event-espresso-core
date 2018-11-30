/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';
import { IconButton, SelectControl } from '@wordpress/components';

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
		<IconButton
			className={ view === 'list' ? 'active-list' : '' }
			icon="editor-justify"
			tooltip={ __( 'list view', 'event_espresso' ) }
			onClick={ setListView }
		/>
	);

	/**
	 * @param {string} view
	 * @param {Function} setGridView
	 * @return {Object} rendered grid view icon button
	 */
	gridView = ( view, setGridView ) => (
		<IconButton
			className={ view === 'grid' ? 'active-list' : '' }
			icon="screenoptions"
			tooltip={ __( 'grid view', 'event_espresso' ) }
			onClick={ setGridView }
		/>
	);

	render() {
		const {
			perPage,
			view,
			setPerPage,
			setListView,
			setGridView,
		} = this.props;
		const entityFilters = this.props.entityFilters ?
			<div className="ee-entity-list-filter-bar">
				{ this.props.entityFilters }
			</div> :
			null;
		return (
			<div className="ee-entity-list-filter-bar-wrapper">
				{ entityFilters }
				<div className="ee-entity-list-view-bar">
					<div
						className="ee-per-page-filter ee-filter-bar-filter">
						{ this.perPage( perPage, setPerPage ) }
					</div>
					<div
						className="ee-view-filter ee-filter-bar-filter">
						{ this.listView( view, setListView ) }
						{ this.gridView( view, setGridView ) }
					</div>
				</div>
			</div>
		);
	}
}

export default EntityListFilterBar;
