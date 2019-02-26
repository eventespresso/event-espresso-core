/**
 * External imports
 */
import PropTypes from 'prop-types';
import {
	compose,
	createHigherOrderComponent,
	withInstanceId,
} from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import JwPagination from 'jw-react-pagination';

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
					entitiesPerPage: PropTypes.number,
					position: PropTypes.string,
				};

				constructor( props ) {
					super( props );
					this.state = {
						entityPage: [],
					};
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
						instanceId = 0,
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
							previous: __( 'Previous', 'event_espresso' ),
							next: __( 'Next', 'event_espresso' ),
						};
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
					return entities && (
						<Fragment>
							{
								position === ( 'top' || 'both' ) ?
									pagination :
									null
							}
							<EntityList
								entities={ this.state.entityPage }
								{ ...otherProps }
							/>
							{
								position === ( 'bottom' || 'both' ) ?
									pagination :
									null
							}
						</Fragment>
					);
				}
			};
		},
	] ),
	'withEntityPagination'
);
