/**
 * External imports
 */
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import JwPagination from 'jw-react-pagination';
import {
	compose,
	createHigherOrderComponent,
	withInstanceId,
} from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import './style.css';

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
		( EntityList ) => {
			return class EntityPagination extends Component {
				static propTypes = {
					entities: PropTypes.array.isRequired,
					instanceId: PropTypes.number.isRequired,
					entitiesPerPage: PropTypes.oneOfType( [
						PropTypes.string,
						PropTypes.number,
					] ),
					position: PropTypes.string,
				};

				constructor( props ) {
					super( props );
					this.state = {
						entityPage: [],
					};
				}

				shouldComponentUpdate( nextProps, nextState ) {
					return ! (
						isEqual( nextProps, this.props ) &&
						isEqual( nextState.entityPage, this.state.entityPage )
					);
				}

				/**
				 * @function
				 * @param {Array} entityPage
				 */
				onPaginationChange = ( entityPage ) => {
					// update local state with new page of items
					this.setState( { entityPage } );
				};

				render() {
					const {
						entities,
						instanceId,
						entitiesPerPage = 10,
						position = 'top',
						...otherProps
					} = this.props;
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
					const pagination = (
						<div id={ `ee-entity-pagination-${ instanceId }` }
							className="ee-entity-pagination"
						>
							<JwPagination
								items={ entities }
								onChangePage={ this.onPaginationChange }
								pageSize={ parseInt( entitiesPerPage ) }
								{ ...paginationConfig }
							/>
						</div>
					);
					const topPagination = position === ( 'top' || 'both' ) ?
						pagination :
						null;
					const bottomPagination = position === ( 'bottom' || 'both' ) ?
						pagination :
						null;
					return returnAsProp ? (
						<EntityList
							pagination={ pagination }
							entities={ this.state.entityPage }
							noResultsText={ noResultsText }
							{ ...otherProps }
						/>
					) : (
						<Fragment>
							{ topPagination }
							<EntityList
								entities={ this.state.entityPage }
								noResultsText={ noResultsText }
								{ ...otherProps }
							/>
							{ bottomPagination }
						</Fragment>
					);
				}
			};
		},
	] ),
	'withEntityPagination'
);
