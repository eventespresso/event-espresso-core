/**
 * External imports
 */
import { filter, findIndex, uniq } from 'lodash';
import warning from 'warning';
import { IconButton } from '@wordpress/components';
import { useMemo, useState, useCallback, useRef } from '@wordpress/element';
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
	assignmentsCounts,
	hasNoAssignments,
	assignedState,
	setAssignedState,
} ) => {
	const [ submitting, setSubmitting ] = useState( false );
	const [ formError, setFormError ] = useState( '' );
	const processChanges = useCallback( () => {
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
	}, [ dateEntities, assignedState, addTicketEntities, removeTicketEntities ] );
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

	/**
	 * not only do we need to know how many existing relations between tickets
	 * and dates there are, but also how many are queued for removal as well
	 * as new ones queued for being added
	 *
	 * @function
	 * @param {Object} dateEntity
	 * @param {Object} ticketEntity
	 * @param {Object} assigned
	 * @param {Object} removed
	 * @return {Object} JSON object with ticket and date assignment counts
	 */
	const calculateTotalAssignmentCounts = useCallback(
		( dateEntity, ticketEntity ) => {
			const ticketCountForDate = assignmentsCounts.dateEntities[ dateEntity.id ];
			const dateCountForTicket = assignmentsCounts.ticketEntities[ ticketEntity.id ];
			const assignedTickets = handler.assignedCount(
				assignedState.assigned,
				null,
				ticketEntity
			);
			const removedTickets = handler.removedCount(
				assignedState.removed,
				null,
				ticketEntity
			);
			const assignedDates = handler.assignedCount(
				assignedState.assigned,
				dateEntity
			);
			const removedDates = handler.removedCount(
				assignedState.removed,
				dateEntity
			);
			const totalTicketAssignmentsForDate = ticketCountForDate +
				assignedDates - removedDates;
			const totalDateAssignmentsForTicket = dateCountForTicket +
				assignedTickets - removedTickets;
			return {
				totalTicketAssignmentsForDate,
				totalDateAssignmentsForTicket,
			};
		},
		[ assignedState ]
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
		(
			hasTicket,
			isAssigned,
			isRemoved,
			totalTicketAssignmentsForDate,
			totalDateAssignmentsForTicket
		) => {
			const dateCount = dateEntities.length;
			const ticketCount = ticketEntities.length;
			const currentlyAssigned = isAssigned ||
				( hasTicket && ! isRemoved );
			const canRemoveAssignment = (
				// managing a single date so ignore other dates
				dateCount < 2 && totalTicketAssignmentsForDate > 1
			) || (
				// managing a single ticket so ignore other tickets
				ticketCount < 2 && totalDateAssignmentsForTicket > 1
			) || (
				// managing ticket assignments for all tickets and all dates so
				// both need to have more than one assignment to remove this one
				dateCount > 1 && totalTicketAssignmentsForDate > 1 &&
				ticketCount > 1 && totalDateAssignmentsForTicket > 1
			);
			return {
				currentlyAssigned,
				canRemoveAssignment,
			};
		},
		[ dateEntities.length, ticketEntities.length ]
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
		(
			currentlyAssigned,
			canRemoveAssignment,
			totalDateAssignmentsForTicket
		) => {
			const dateCount = dateEntities.length;
			let action = currentlyAssigned && canRemoveAssignment ?
				removeTicketEntity :
				assignTicketEntity;
			if (
				currentlyAssigned &&
				! canRemoveAssignment &&
				action === assignTicketEntity
			) {
				const error = dateCount > 1 &&
				totalDateAssignmentsForTicket === 1 ?
					__(
						'Tickets must always have at least one Event Date' +
						' assigned to them. If the current assignment is not' +
						' correct, assign the correct Event Date first, then' +
						' remove others as required.',
						'event_espresso'
					) : __(
						'Event Dates must always have at least one Ticket' +
						' assigned to them. If the current assignment is not' +
						' correct, assign the correct Ticket first, then' +
						' remove others as required.',
						'event_espresso'
					);
				action = () => {
					return setFormError( error );
				};
			}
			return action;
		},
		[
			removeTicketEntity,
			assignTicketEntity,
			dateEntities.length,
			setFormError,
		]
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
		( totalTicketAssignmentsForDate, totalDateAssignmentsForTicket ) => {
			const dateCount = dateEntities.length;
			const ticketCount = ticketEntities.length;
			return (
				// dealing with a single date so ignore other dates
				dateCount < 2 && totalTicketAssignmentsForDate === 0
			) || (
				// dealing with a single ticket so ignore other tickets
				ticketCount < 2 && totalDateAssignmentsForTicket === 0
			) || (
				// managing ticket assignments for all tickets and all dates so
				// if either are missing assignments then display an error
				dateCount > 1 && ticketCount > 1 && (
					totalTicketAssignmentsForDate === 0 ||
					totalDateAssignmentsForTicket === 0
				)
			) ?
				' ee-tam-assignments-error' :
				'';
		},
		[ dateEntities.length, ticketEntities.length ]
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
				totalTicketAssignmentsForDate,
				totalDateAssignmentsForTicket,
			} = calculateTotalAssignmentCounts(
				dateEntity,
				ticketEntity,
			);
			const {
				hasTicket,
				isAssigned,
				isRemoved,
			} = determineCurrentAssignment(
				dateEntity,
				ticketEntity,
				dateTicketEntities,
			);
			const {
				currentlyAssigned,
				canRemoveAssignment,
			} = getActionModifiers(
				hasTicket,
				isAssigned,
				isRemoved,
				totalTicketAssignmentsForDate,
				totalDateAssignmentsForTicket
			);
			const action = getAction(
				currentlyAssigned,
				canRemoveAssignment,
				totalDateAssignmentsForTicket
			);
			const assignmentsErrorClass = getAssignmentsErrorClass(
				totalTicketAssignmentsForDate,
				totalDateAssignmentsForTicket
			);
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
		[ dateEntities, ticketEntities, ticketEntitiesByDateIds ]
	);

	/**
	 * @function
	 * @return {Object} rendered cancel button
	 */
	const getFormError = useCallback(
		() => {
			let errorMessage = formError;
			if ( hasNoAssignments ) {
				errorMessage = dateEntities.length === 1 ?
					__(
						'Event Dates must always have at least one Ticket' +
						' assigned to them but one or more of the Event Dates' +
						' below does not have any. Please correct the' +
						' assignments for the highlighted cells.',
						'event_espresso'
					) : __(
						'Tickets must always have at least one Event Date' +
						' assigned to them but one or more of the Tickets' +
						' below does not have any. Please correct the' +
						' assignments for the highlighted cells.',
						'event_espresso'
					);
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
		[ hasNoAssignments, formError, dateEntities ]
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
	withSelect( ( select, ownProps ) => {
		const {
			dateEntity,
			dateEntities,
			ticketEntity,
			ticketEntities,
			entities = [],
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
		if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			dtmProps.entities = [ dateEntity ];
		} else if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			dtmProps.entities = sortDateEntitiesList( dateEntities );
			dtmProps.ticketEntities = [ ticketEntity ];
		} else if ( Array.isArray( dateEntities ) && Array.isArray( ticketEntities ) ) {
			dtmProps.entities = sortDateEntitiesList( dateEntities );
		}
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const ticketEntitiesByDateIds = {};
		dtmProps.entities.forEach( ( date ) => {
			if ( isModelEntityOfModel( date, 'datetime' ) ) {
				const relatedTickets = getRelatedEntities( date, 'ticket' );
				ticketEntitiesByDateIds[ date.id ] = uniq( relatedTickets );
			}
		} );
		return {
			...dtmProps,
			ticketEntitiesByDateIds,
		};
	} ),
	( WrappedComponent ) => ( {
		entities: dateEntities,
		ticketEntities,
		ticketEntitiesByDateIds,
		toggleEditor,
		onUpdate = () => null,
		...otherProps
	} ) => {
		const [ assignedState, setAssignedState ] = useState( { assigned: {}, removed: {} } );
		const hasNoAssignments = useRef( false );
		const assignmentsCounts = useMemo( () => {
			let dateTickets = [];
			let ticketDateCount = 0;
			let dateTicketCount = 0;
			const ticketCount = ticketEntities.length;
			const counts = {
				ticketEntities: {},
				dateEntities: {},
			};
			dateEntities.forEach( ( eventDate ) => {
				dateTicketCount = 0;
				warning(
					isModelEntityOfModel( eventDate, 'datetime' ),
					'Invalid EE Date model object!'
				);
				dateTickets = ticketEntitiesByDateIds[ eventDate.id ] ?
					ticketEntitiesByDateIds[ eventDate.id ] :
					[];
				counts.dateEntities[ eventDate.id ] = dateTickets.length;
				ticketEntities.forEach( ( ticket ) => {
					warning(
						isModelEntityOfModel( ticket, 'ticket' ),
						'Invalid EE' +
						' Ticket model object!'
					);
					if ( typeof counts.ticketEntities[ ticket.id ] === 'undefined' ) {
						counts.ticketEntities[ ticket.id ] = 0;
					}
					const ticketAssignedToDate = findIndex(
						dateTickets,
						{ id: ticket.id }
					) > noIndex;
					if ( ticketAssignedToDate ) {
						dateTicketCount++;
						ticketDateCount++;
						counts.ticketEntities[ ticket.id ]++;
					}
				} );
				if (
					dateTicketCount === 0 &&
					ticketCount > 0 &&
					! assignedState.assigned[ eventDate.id ]
				) {
					hasNoAssignments.current = true;
				}
			} );
			if ( ticketCount === 1 && ticketDateCount > 0 ) {
				hasNoAssignments.current = false;
			}
			return counts;
		}, [ ticketEntitiesByDateIds, assignedState ] );
		const toggleTicketAssignmentsManager = useCallback( ( update = false ) => {
			if ( hasNoAssignments.current ) {
				const message = dateEntities.length === 1 ?
					__(
						'You have not assigned any tickets to the event date.  You cannot close this modal until until you do so',
						'event_espresso'
					) :
					__(
						'Tickets must always have at least one Event date assigned to them.  One ore more of the tickets does not have any. You cannot close this modal until that is corrected.',
						'event_espresso'
					);
				// eslint-disable-next-line no-alert
				window.alert( message );
				return false;
			}
			if ( update ) {
				onUpdate();
			}
			toggleEditor();
		}, [ ticketEntitiesByDateIds, toggleEditor, onUpdate ] );
		return <WrappedComponent
			entities={ dateEntities }
			ticketEntities={ ticketEntities }
			ticketEntitiesByDateIds={ ticketEntitiesByDateIds }
			toggleEditor={ toggleTicketAssignmentsManager }
			assignmentsCounts={ assignmentsCounts }
			hasNoAssignments={ hasNoAssignments.current }
			assignedState={ assignedState }
			setAssignedState={ setAssignedState }
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
