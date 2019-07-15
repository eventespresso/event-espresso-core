/**
 * External imports
 */
import JwPagination from 'jw-react-pagination';
import PropTypes from 'prop-types';
import {
	compose,
	createHigherOrderComponent,
	withInstanceId,
} from '@wordpress/compose';
import { Fragment, useState, useCallback, useEffect, useRef } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * adds pagination to an "EntityList" component
 * and controls what entities are displayed
 *
 * @param {Object} paginationConfig
 * @param {Array} entities
 * @param {number} instanceId
 * @param {number|string} entitiesPerPage
 * @param {string} position
 * @param {Function} onPageChange
 * @param {Object} EntityList
 * @param {Object} otherProps
 * @return {Object} EntityList with added EntityPagination
 */
const EntityPagination = ( {
	paginationConfig = {},
	entities,
	instanceId,
	entitiesPerPage = 10,
	position = 'top',
	onPageChange = () => null,
	EntityList = () => null,
	...otherProps
} ) => {
	const [ pagedEntities, setPagedEntities ] = useState( entities );
	const currentEntities = useRef( entities );
	const onPaginationChange = useCallback( ( updatedPagedEntities ) => {
		setPagedEntities( updatedPagedEntities );
		onPageChange( updatedPagedEntities );
	}, [ onPageChange ] );
	useEffect(
		() => {
			// because jwPagination uses the incoming entities array to determine
			// whether to recalculate the paged entities, we need to force
			// that array to change if entitiesPerPage changes.
			currentEntities.current = [ ...entities ];
			// forces re-render because useEffect executes after initial
			// render calculation done.
			setPagedEntities( [] );
		},
		[ entitiesPerPage, entities ]
	);
	paginationConfig.labels = paginationConfig.labels &&
	paginationConfig.labels.first &&
	paginationConfig.labels.last &&
	paginationConfig.labels.previous &&
	paginationConfig.labels.next ?
		paginationConfig.labels :
		{
			first: __( 'First', 'event_espresso' ),
			last: __( 'Last', 'event_espresso' ),
			previous: __( 'Prev', 'event_espresso' ),
			next: __( 'Next', 'event_espresso' ),
		};
	const noResultsText = paginationConfig.noResultsText ?
		paginationConfig.noResultsText :
		__(
			'no results found (try changing filters)',
			'event_espresso'
		);
	const returnAsProp = paginationConfig.returnAsProp ?
		paginationConfig.returnAsProp :
		false;
	const pagination = useCallback(
		() => (
			<div id={ `ee-entity-pagination-${ instanceId }` }
				className="ee-entity-pagination"
			>
				<JwPagination
					items={ currentEntities.current }
					onChangePage={ onPaginationChange }
					pageSize={ parseInt( entitiesPerPage, 10 ) }
					{ ...paginationConfig }
				/>
			</div>
		),
		[
			instanceId,
			onPaginationChange,
			entities,
			entitiesPerPage,
			paginationConfig,
		]
	);
	const topPagination = position === ( 'top' || 'both' ) ?
		pagination() :
		null;
	const bottomPagination = position === ( 'bottom' || 'both' ) ?
		pagination() :
		null;
	return returnAsProp ? (
		<EntityList
			pagination={ pagination() }
			entities={ pagedEntities }
			noResultsText={ noResultsText }
			{ ...otherProps }
		/>
	) : (
		<Fragment>
			{ topPagination }
			<EntityList
				entities={ pagedEntities }
				noResultsText={ noResultsText }
				{ ...otherProps }
			/>
			{ bottomPagination }
		</Fragment>
	);
};

EntityPagination.propTypes = {
	paginationConfig: PropTypes.shape( {
		returnAsProp: PropTypes.bool,
		noResultsText: PropTypes.string,
		labels: PropTypes.shape( {
			first: PropTypes.string,
			last: PropTypes.string,
			previous: PropTypes.string,
			next: PropTypes.string,
		} ),
	} ),
	entities: PropTypes.array.isRequired,
	instanceId: PropTypes.number.isRequired,
	entitiesPerPage: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	position: PropTypes.string,
};

/**
 * withEntityPagination
 * Higher-Order-Component that wraps an "EntityList" component
 * with an EntityPagination component that adds a pagination container
 * below the EntityList and controls what entities are displayed
 *
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */
export default ( paginationConfig = {} ) => createHigherOrderComponent(
	compose( [
		withInstanceId,
		( EntityList ) => ( props ) => {
			return <EntityPagination
				{ ...props }
				paginationConfig={ paginationConfig }
				EntityList={ EntityList }
			/>;
		},
	] ),
	'withEntityPagination'
);
