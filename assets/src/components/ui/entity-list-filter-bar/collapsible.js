/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring'
import { isFunction } from 'lodash';
import { useMemo, useRef } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { useRect } from '@eventespresso/hooks';

/**
 * Collapsible
 * This component is an extraction from EntityListFilterBar
 * and is intended to be used only in context with that parent component.
 *
 * @param {Object} entityFilters additional entity specific filters
 * @param {string} listId
 * @param {number} perPage
 * @param {string} searchText
 * @param {function} setPerPage
 * @param {function} setSearchText
 * @param {boolean} showEntityFilters
 * @return {Object} Collapsible
 */
const Collapsible = ( {
	entityFilters = null,
	listId,
	perPage,
	searchText,
	setPerPage,
	setSearchText,
	showEntityFilters = false
} ) => {
	const ref = useRef();
	const { height } = useRect(ref);
	const props = useSpring({
		height: showEntityFilters ? height : 0,
		opacity: showEntityFilters ? 1 : 0
	} );

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

	return (
		<animated.div style={props}>
			<div className="ee-filter-bar-filter-collapsible" ref={ref}>
				{ entityFilters }
				{ perPageControl }
				{ searchInput }
			</div>
		</animated.div>
	);
};

Collapsible.propTypes = {
	entityFilters: PropTypes.object,
	listId: PropTypes.string.isRequired,
	perPage: PropTypes.number.isRequired,
	searchText: PropTypes.string.isRequired,
	setPerPage: PropTypes.func.isRequired,
	setSearchText: PropTypes.func.isRequired,
	showEntityFilters: PropTypes.bool.isRequired,
};

export default Collapsible;
