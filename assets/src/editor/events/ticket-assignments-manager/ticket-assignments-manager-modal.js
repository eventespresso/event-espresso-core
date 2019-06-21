/**
 * External imports
 */
import { filter, findIndex } from 'lodash';
import warning from 'warning';
import { IconButton } from '@wordpress/components';
import { useState, useCallback, useRef } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import {
	CalendarPageDate,
	ResponsiveTable,
	twoColumnAdminFormLayout,
	withFormContainerAndPlaceholder,
} from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel, ticketModel } from '@eventespresso/model';
import { compose, ifCondition } from '@wordpress/compose';
import { withEditorModal } from '@eventespresso/editor-hocs';
import { withEntityPagination } from '@eventespresso/higher-order-components';
import { withDispatch, withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import * as handler from './ticket-assignments-handler';
import './ticket-assignments-manager.css';
import { sortDateEntitiesList } from '../dates-and-times/editor-date/filter-bar/date-entities-list-filter-utils';
import { withEditorDateEntities, withEditorTicketEntities } from '../hocs';
import { useCountsManager } from './hooks';

const noIndex = -1;

const {
	FormInfo,
	FormSection,
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const { getBackgroundColorClass: getDateBgColorClass } = dateTimeModel;
const { getBackgroundColorClass: getTicketBgColorClass } = ticketModel;

const TicketAssignmentsManagerModal = ( {
	entities: dateEntities,
	ticketEntities,
	ticketEntitiesByDateIds,
	addTicketEntities,
	removeTicketEntities,
	pagination,
	toggleEditor,
	hasNoAssignments,
	noAssignmentsMessage,
	assignedState,
	setAssignedState,
	assignmentCounts,
} ) => {
	const [ submitting, setSubmitting ] = useState( false );
	const [ formError, setFormError ] = useState( '' );
	const processChanges = useCallback( () => {
		if ( hasNoAssignments ) {
			// brings up confirm modal because the editor won't close
			toggleEditor();
			return;
		}
		setSubmitting( true );
		handler.processChanges(
			dateEntities,
			assignedState.assigned,
			addTicketEntities,
			assignedState.removed,
			removeTicketEntities,
		).then( ( updates ) => {
			const wasUpdated = filter( updates, ( updated ) => {
				return !! updated;
			} );
			toggleEditor( wasUpdated.length > 0 );
		} ).catch( ( error ) => {
			warning( false, error );
		} );
	}, [
		dateEntities,
		assignedState,
		addTicketEntities,
		removeTicketEntities,
		hasNoAssignments
	] );
	const assignTicketEntity = useCallback(
		( dateEntity, ticketEntity ) => {
			if (
				! isModelEntityOfModel( dateEntity, 'datetime' ) ||
				! isModelEntityOfModel( ticketEntity, 'ticket' )
			) {
				return;
			}
			setAssignedState( ( prevState ) => {
				return handler.assignTicketEntity(
					prevState,
					dateEntity,
					ticketEntity
				);
			} );
			setFormError( '' );
		},
		[]
	);
	const removeTicketEntity = useCallback(
		( dateEntity, ticketEntity ) => {
			if (
				! isModelEntityOfModel( dateEntity, 'datetime' ) ||
				! isModelEntityOfModel( ticketEntity, 'ticket' )
			) {
				return;
			}
			setAssignedState( ( prevState ) => {
				return handler.removeTicketEntity(
					prevState,
					dateEntity,
					ticketEntity
				);
			} );
		},
		[]
	);
	/**
	 * @function
	 * @param {Array} ticketEntities
	 * @param {number} dateCount
	 * @return {Array} table header cell data
	 */
	const ticketHeaders = useCallback(
		() => {
			const dateCount = dateEntities.length;
			const headerCells = [
				{
					type: 'row',
					class: '',
					value: '',
				},
			];
			if ( dateCount > 1 ) {
				headerCells.push(
					{
						type: 'cell',
						class: 'ee-tam-dates-header',
						value: '',
					}
				);
			}
			ticketEntities.forEach( ( ticket ) => {
				warning(
					isModelEntityOfModel( ticket, 'ticket' ),
					'Invalid EE Ticket model object!'
				);
				let statusClass = getTicketBgColorClass( ticket );
				statusClass = `ee-tam-ticket-header-status ${ statusClass }`;
				const saleDate = ticket.startDate.toFormat( 'MMM DD YYYY' );
				headerCells.push(
					{
						type: 'cell',
						class: 'ee-tam-ticket-header',
						value: (
							<div className="ee-tam-ticket-header-div">
								<div className={ statusClass }>
									<span className="ee-tam-ticket-header-date">
										{ saleDate }
									</span>
								</div>
								<div className="ee-tam-ticket-id">
									{ `#${ ticket.id }` }
								</div>
								<div className="ee-tam-ticket-header-title">
									{ ticket.name }
								</div>
								<div className="ee-tam-ticket-header-price">
									{ `${ ticket.price }` }
									<span className="ee-tam-ticket-header-date">
										{ saleDate }
									</span>
								</div>
							</div>
						),
					}
				);
			} );
			return headerCells;
		},
		[ ticketEntities, dateEntities.length ]
	);

	/**
	 * @function
	 * @param {number} year
	 * @param {Object} ticketEntities
	 * @return {Object} rendered table row
	 */
	const yearRow = useCallback(
		( year, ticketEntitiesForYear ) => {
			const rowData = [
				{
					type: 'row',
					value: '',
					class: 'ee-tam-year-row',
				},
				{
					type: 'cell',
					value: year,
					class: 'ee-tam-date-label',
				},
			];
			ticketEntitiesForYear.forEach( () => {
				rowData.push(
					{
						type: 'cell',
						value: '',
						render: ( rowNumber, colNumber ) => (
							<td
								key={ `row-${ rowNumber }-col-${ colNumber }` }
								className={
									'ee-tam-date-row-ticket ee-rTable-body-td'
								}
							>
							</td>
						),
					}
				);
			} );
			return rowData;
		},
		[]
	);

	/** determines whether the supplied date already has a relation to the
	 *  supplied ticket, or is queued for removal, or has been assigned
	 *
	 * @function
	 * @param {Object} dateEntity
	 * @param {Object} ticketEntity
	 * @param {Array} dateTicketEntities
	 * @param {Object} assigned
	 * @param {Object} removed
	 * @return {Object} JSON object with hasTicket, isAssigned, isRemoved values
	 */
	const determineCurrentAssignment = useCallback(
		( dateEntity, ticketEntity, dateTicketEntities ) => {
			return {
				hasTicket: findIndex(
					dateTicketEntities,
					{ id: ticketEntity.id }
				) > noIndex,
				isAssigned: handler.isAssigned(
					assignedState.assigned,
					dateEntity,
					ticketEntity,
					true
				) > noIndex,
				isRemoved: handler.isRemoved(
					assignedState.removed,
					dateEntity,
					ticketEntity,
					true
				) > noIndex,
			};
		},
		[ assignedState ]
	);

	/**
	 * used to determine if we are adding or removing a ticket assignment
	 *
	 * @function
	 * @param {boolean} hasTicket
	 * @param {boolean} isAssigned
	 * @param {boolean} isRemoved
	 * @param {number} totalTicketAssignmentsForDate
	 * @param {number} totalDateAssignmentsForTicket
	 * @return {Object} JSON object with action modifier values
	 */
	const getActionModifiers = useCallback(
		( hasTicket, isAssigned, isRemoved ) => {
			const currentlyAssigned = isAssigned ||
				( hasTicket && ! isRemoved );
			return { currentlyAssigned };
		},
		[]
	);

	/**
	 * determines what callback to use when modifying a ticket assignment
	 *
	 * @function
	 * @param {boolean} currentlyAssigned
	 * @param {boolean} canRemoveAssignment
	 * @param {number} totalDateAssignmentsForTicket
	 * @return {Function} ticket cell button action
	 */
	const getAction = useCallback(
		( currentlyAssigned ) => {
			return currentlyAssigned ?
				removeTicketEntity :
				assignTicketEntity;
		},
		[ removeTicketEntity, assignTicketEntity ]
	);

	/**
	 * extra css class applied to ticket cell if assignment error exists
	 *
	 * @function
	 * @param {number} totalTicketAssignmentsForDate
	 * @param {number} totalDateAssignmentsForTicket
	 * @return {string} css class
	 */
	const getAssignmentsErrorClass = useCallback(
		( dateEntity, ticketEntity ) => {
			const entitiesHaveEmptyAssignments = () => {
				return assignmentCounts.dates[ dateEntity.id ] === 0 ||
					assignmentCounts.dates[ ticketEntity.id ] === 0;
			};
			return hasNoAssignments && entitiesHaveEmptyAssignments() ?
				' ee-tam-assignments-error' :
				'';
		},
		[ hasNoAssignments ]
	);

	/**
	 * icon and color class representing current ticket date assignment
	 *
	 * @function
	 * @param {boolean} hasTicket
	 * @param {boolean} isAssigned
	 * @param {boolean} isRemoved
	 * @return {Object} JSON object with icon and bgColor values
	 */
	const getIconAndBgColor = useCallback(
		( hasTicket, isAssigned, isRemoved ) => {
			let icon = '';
			let bgColor = 'ee-tam-ticket-relation-button';
			if ( hasTicket ) {
				if ( isRemoved ) {
					icon = 'no';
					bgColor += ' ee-tam-remove-ticket-relation';
				} else {
					icon = 'tickets-alt';
					bgColor += ' ee-tam-has-ticket-relation';
				}
			} else if ( isAssigned ) {
				icon = 'tickets-alt';
				bgColor += ' ee-tam-add-ticket-relation';
			} else {
				icon = 'minus';
				bgColor += ' ee-tam-no-ticket-relation';
			}
			return { icon, bgColor };
		},
		[]
	);

	/**
	 * @function
	 * @param {Object} dateEntity
	 * @param {Object} ticketEntity
	 * @param {Array} dateTicketEntities
	 * @return {Object} rendered table cell
	 */
	const ticketCell = useCallback(
		( dateEntity, ticketEntity, dateTicketEntities ) => {
			const {
				hasTicket,
				isAssigned,
				isRemoved,
			} = determineCurrentAssignment(
				dateEntity,
				ticketEntity,
				dateTicketEntities,
			);
			const { currentlyAssigned } = getActionModifiers(
				hasTicket,
				isAssigned,
				isRemoved,
			);
			const action = getAction( currentlyAssigned );
			const assignmentsErrorClass = getAssignmentsErrorClass( dateEntity, ticketEntity );
			const { icon, bgColor } = getIconAndBgColor(
				hasTicket,
				isAssigned,
				isRemoved
			);
			return {
				type: 'cell',
				class: `ee-tam-date-row-ticket${ assignmentsErrorClass }`,
				value: (
					<IconButton
						icon={ icon }
						className={ bgColor }
						size={ 45 }
						onClick={ ( event ) => {
							event.preventDefault();
							event.stopPropagation();
							action( dateEntity, ticketEntity );
						} }
						onKeyDown={ ( event ) => {
							if ( event.keyCode === ENTER ) {
								event.preventDefault();
								event.stopPropagation();
								action( dateEntity, ticketEntity );
							}
						} }
					/>
				),
			};
		},
		[
			assignedState,
			getActionModifiers,
			getAction,
			getAssignmentsErrorClass,
			getIconAndBgColor,
		]
	);

	/**
	 * @function
	 * @param {Object} dateEntity
	 * @return {Object} rendered table cell
	 */
	const dateHeader = useCallback(
		( dateEntity ) => {
			return {
				type: 'cell',
				class: 'ee-tam-date-label',
				value: (
					<div className="ee-tam-date-label-div">
						<div className="ee-tam-date-id">
							{ `#${ dateEntity.id }` }
						</div>
						<div className="ee-tam-date-label-text">
							{ dateEntity.name }
						</div>
						<CalendarPageDate
							startDate={ dateEntity.start }
							statusClass={ getDateBgColorClass( dateEntity ) }
							size={ 'small' }
						/>
					</div>
				),
			};
		},
		[]
	);

	/**
	 * @function
	 * @param {Array} dateEntities
	 * @param {Array} ticketEntities
	 * @param {Object} ticketEntitiesByDateIds
	 * @param {number} dateCount
	 * @return {Array} array of row data objects
	 */
	const dateRows = useCallback(
		() => {
			let year = 0;
			const dateCount = dateEntities.length;
			const rows = [];
			dateEntities.forEach(
				( eventDate ) => {
					warning(
						isModelEntityOfModel( eventDate, 'datetime' ),
						'Invalid EE Date model object!'
					);
					const dateYear = parseInt(
						eventDate.start.toFormat( 'YYYY' ),
						10
					);
					if ( dateCount > 1 && dateYear > year ) {
						year = dateYear;
						rows.push( yearRow( year, ticketEntities ) );
					}
					const rowData = [
						{
							type: 'row',
							class: 'ee-tam-date-row',
							value: '',
						},
					];
					if ( dateCount > 1 ) {
						rowData.push( dateHeader( eventDate ) );
					}
					const dateTicketEntities = ticketEntitiesByDateIds[ eventDate.id ] ?
						ticketEntitiesByDateIds[ eventDate.id ] :
						[];
					ticketEntities.forEach( ( ticket ) => {
						warning(
							isModelEntityOfModel( ticket, 'ticket' ),
							'Invalid EE Ticket model object!'
						);
						rowData.push(
							ticketCell( eventDate, ticket, dateTicketEntities )
						);
					} );
					rows.push( rowData );
				}
			);
			return rows;
		},
		[ dateEntities, ticketEntities, ticketEntitiesByDateIds, ticketCell ]
	);

	/**
	 * @function
	 * @return {Object} rendered cancel button
	 */
	const getFormError = useCallback(
		() => {
			let errorMessage = formError;
			if ( hasNoAssignments ) {
				errorMessage = noAssignmentsMessage;
			}
			return errorMessage ?
				<FormInfo
					formInfo={ errorMessage }
					dashicon={ 'warning' }
					dismissable={ true }
					colSize={ 10 }
					offset={ 1 }
				/> : null;
		},
		[ hasNoAssignments, formError ]
	);

	/**
	 * @function
	 * @param {Function} processChanges
	 * @return {Object} rendered submit button
	 */
	const submitButton = useCallback(
		() => {
			const { FormSubmitButton } = twoColumnAdminFormLayout;
			return (
				<FormSubmitButton
					onClick={
						( event ) => {
							event.preventDefault();
							event.stopPropagation();
							processChanges();
							setFormError( '' );
						}
					}
					buttonText={ __(
						'Update Ticket Assignments',
						'event_espresso'
					) }
					submitting={ submitting }
				/>
			);
		},
		[ processChanges, submitting, setFormError ]
	);

	/**
	 * @function
	 * @return {Object} rendered cancel button
	 */
	const cancelButton = useCallback(
		() => {
			const { FormCancelButton } = twoColumnAdminFormLayout;
			return (
				<FormCancelButton
					onClick={
						( event ) => {
							event.preventDefault();
							event.stopPropagation();
							setFormError( '' );
							toggleEditor();
						}
					}
				/>
			);
		},
		[ setFormError, toggleEditor ]
	);

	let tableId = 'ee-ticket-assignments-manager-';
	if ( dateEntities.length === 1 ) {
		tableId += dateEntities[ 0 ].id;
	} else {
		tableId += dateEntities.length + '-' + ticketEntities.length;
	}
	return (
		<FormWrapper>
			<FormSection>
				{ getFormError() }
				<ResponsiveTable
					columns={ ticketHeaders() }
					rowData={ dateRows() }
					metaData={ {
						tableId,
						tableCaption: __(
							'Ticket Assignments',
							'event_espresso'
						),
						hasRowHeaders: dateEntities.length > 1,
					} }
					classes={ {
						tableClass: 'ee-ticket-assignments-manager',
					} }
				/>
				{ pagination }
			</FormSection>
			<FormSaveCancelButtons
				submitButton={ submitButton() }
				cancelButton={ cancelButton() }
			/>
		</FormWrapper>
	);
};

export default compose( [
	ifCondition( ( { editorOpen } ) => editorOpen ),
	withEditorDateEntities,
	withEditorTicketEntities,
	withDispatch( ( dispatch ) => {
		const addTicketEntities = ( dateEntity, ticketEntities ) => {
			warning(
				isModelEntityOfModel( dateEntity, 'datetime' ),
				'date is not a BaseEntity of the datetime model.'
			);
			const { createRelations } = dispatch( 'eventespresso/core' );
			return createRelations(
				'datetime',
				dateEntity.id,
				'ticket',
				ticketEntities
			);
		};
		const removeTicketEntities = ( dateEntity, ticketEntities ) => {
			warning(
				isModelEntityOfModel( dateEntity, 'datetime' ),
				'date is not a BaseEntity of the datetime model.'
			);
			const { removeRelationForEntity } = dispatch( 'eventespresso/core' );
			const relationsRemoved = [];
			if ( Array.isArray( ticketEntities ) ) {
				ticketEntities.forEach( ( ticketEntity ) => {
					warning(
						isModelEntityOfModel( ticketEntity, 'ticket' ),
						'ticket is not a BaseEntity of the ticket model.'
					);
					relationsRemoved.push(
						removeRelationForEntity(
							'datetime',
							dateEntity.id,
							'ticket',
							ticketEntity.id
						)
					);
				} );
			}
			return Promise.all( relationsRemoved );
		};
		return { addTicketEntities, removeTicketEntities };
	} ),
	( WrappedComponent ) => ( props ) => {
		// adds a ref for handling count updates.
		const assignmentCounts = useRef( { dates: {}, tickets: {} } );
		return <WrappedComponent assignmentCounts={ assignmentCounts } { ...props } />;
	},
	withSelect( ( select, ownProps ) => {
		const {
			dateEntity,
			dateEntities,
			ticketEntity,
			ticketEntities,
			entities = [],
			assignmentCounts,
		} = ownProps;
		const dtmProps = {
			entities,
			ticketEntities,
			dateEntities,
			ticketEntitiesByDateIds: {},
			notice: __(
				'loading event date ticket assignments',
				'event_espresso'
			),
		};
		const { getRelatedEntities } = select( 'eventespresso/core' );

		// initial setup based on incoming entity
		if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			dtmProps.entities = [ dateEntity ];
			// let's update the assignmentCounts for this dateEntity and all it's related
			// ticket Entities (if necessary)
			if ( typeof assignmentCounts.current.dates[ dateEntity.id ] === 'undefined' ) {
				const relatedTickets = getRelatedEntities( dateEntity, 'ticket' );
				dtmProps.ticketEntitiesByDateIds[ dateEntity.id ] = relatedTickets;
				assignmentCounts.current.dates[ dateEntity.id ] = relatedTickets.length;
				if ( relatedTickets.length ) {
					relatedTickets.forEach( ( ticket ) => {
						assignmentCounts.current.tickets[ ticket.id ] = getRelatedEntities(
							ticket,
							'datetime'
						).length;
					} );
				}
			}
		} else if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			dtmProps.entities = sortDateEntitiesList( dateEntities );
			dtmProps.ticketEntities = [ ticketEntity ];

			// let's update the assignmentCounts for this ticketEntity and all it's related
			// date entities ( if necessary )
			if ( typeof assignmentCounts.current.tickets[ ticketEntity.id ] === 'undefined' ) {
				const relatedDates = getRelatedEntities( ticketEntity, 'datetime' );
				assignmentCounts.current.tickets[ ticketEntity.id ] = relatedDates.length;
				if ( relatedDates.length ) {
					relatedDates.forEach( ( date ) => {
						const relatedTickets = getRelatedEntities( date, 'ticket' );
						dtmProps.ticketEntitiesByDateIds[ date.id ] = relatedTickets;
						assignmentCounts.current.dates[ date.id ] = relatedTickets.length;
					} );
				}
			}
		} else if ( Array.isArray( dateEntities ) && Array.isArray( ticketEntities ) ) {
			dtmProps.entities = sortDateEntitiesList( dateEntities );
			// need to setup the assignmentCounts for all the tickets and all the dates!
			dateEntities.forEach( ( date ) => {
				if ( typeof assignmentCounts.current.dates[ date.id ] === 'undefined' ) {
					const relatedTickets = getRelatedEntities( date, 'ticket' );
					dtmProps.ticketEntitiesByDateIds[ date.id ] = relatedTickets;
					assignmentCounts.current.dates[ date.id ] = relatedTickets.length;
				}
			} );
			ticketEntities.forEach( ( ticket ) => {
				if ( typeof assignmentCounts.current.tickets[ ticket.id ] === 'undefined' ) {
					assignmentCounts.current.tickets[ ticket.id ] = getRelatedEntities(
						ticket,
						'datetime'
					).length;
					// no need to set dtmProps.ticketEntitiesByDateIds here as
					// those will already have been setup for all dates.
				}
			} );
		}
		return dtmProps;
	} ),
	( WrappedComponent ) => ( { assignmentCounts, entities: dateEntities, ticketEntities, ...otherProps } ) => {
		const [ assignedState, setAssignedState ] = useState(
			{ assigned: {}, removed: {} }
		);
		const [
			hasNoAssignments,
			noAssignmentsMessage,
			updatedAssignmentCounts,
		] = useCountsManager(
			dateEntities,
			ticketEntities,
			assignmentCounts.current,
			assignedState
		);

		return <WrappedComponent
			{ ...otherProps }
			assignmentCounts={ updatedAssignmentCounts }
			entities={ dateEntities }
			ticketEntities={ ticketEntities }
			assignedState={ assignedState }
			setAssignedState={ setAssignedState }
			hasNoAssignments={ hasNoAssignments }
			noAssignmentsMessage={ noAssignmentsMessage }
		/>;
	},
	( WrappedComponent ) => ( {
		toggleEditor,
		onUpdate = () => null,
		hasNoAssignments,
		noAssignmentsMessage,
		...otherProps
	} ) => {
		const toggleTicketAssignmentsManager = useCallback( ( update = false ) => {
			if ( hasNoAssignments ) {
				// eslint-disable-next-line no-alert
				window.alert( noAssignmentsMessage );
				return false;
			}
			if ( update ) {
				onUpdate();
			}
			toggleEditor();
		}, [ hasNoAssignments ] );
		return <WrappedComponent
			toggleEditor={ toggleTicketAssignmentsManager }
			hasNoAssignments={ hasNoAssignments }
			noAssignmentsMessage={ noAssignmentsMessage }
			{ ...otherProps }
		/>;
	},
	withEditorModal( {
		title: __( 'Event Date Ticket Assignments', 'event_espresso' ),
		customClass: 'ee-event-date-tickets-manager-modal',
		closeButtonLabel: __( 'close event date tickets manager',
			'event_espresso'
		),
	} ),
	withFormContainerAndPlaceholder,
	withEntityPagination( {
		returnAsProp: true,
		entitiesPerPage: 6,
		position: 'bottom',
	} ),
] )( TicketAssignmentsManagerModal );
