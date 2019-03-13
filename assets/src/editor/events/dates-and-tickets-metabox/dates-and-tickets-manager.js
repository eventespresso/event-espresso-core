/**
 * External imports
 */
import { filter, find, findIndex, isFunction } from 'lodash';
import PropTypes from 'prop-types';
import { IconButton } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import {
	CalendarPageDate,
	FormContainer,
	FormPlaceholder,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import {
	default as withDatesAndTicketsManagerState,
} from './with-dates-and-tickets-manager-state';
import './dates-and-tickets-manager.css';

const noIndex = -1;

const { MODEL_NAME: DATETIME, getBackgroundColorClass } = dateTimeModel;
const { MODEL_NAME: TICKET } = ticketModel;

export class DatesAndTicketsManager extends Component {
	static propTypes = {
		dates: PropTypes.arrayOf( PropTypes.object ).isRequired,
		tickets: PropTypes.arrayOf( PropTypes.object ).isRequired,
		filterEntity: PropTypes.object,
		filterFor: PropTypes.string,
	};

	constructor( props ) {
		super( props );
		this.state = {
			assigned: {},
			removed: {},
			submitting: false,
		};
	}

	/**
	 * @function
	 */
	processChanges = () => {
		const relationUpdates = [];
		this.setState( { submitting: true } );
		for ( let dateID in this.state.removed ) {
			dateID = parseInt( dateID );
			if ( this.state.removed.hasOwnProperty( dateID ) ) {
				const date = find( this.props.dates, { id: dateID } );
				if ( isModelEntityOfModel( date, DATETIME ) ) {
					const ticketsToRemove = this.state.removed[ dateID ];
					if ( Array.isArray( ticketsToRemove ) ) {
						relationUpdates.push(
							this.removeTickets( date, ticketsToRemove )
						);
					}
				}
			}
		}
		for ( let dateID in this.state.assigned ) {
			dateID = parseInt( dateID );
			if ( this.state.assigned.hasOwnProperty( dateID ) ) {
				const date = find( this.props.dates, { id: dateID } );
				if ( isModelEntityOfModel( date, DATETIME ) ) {
					const ticketsToAssign = this.state.assigned[ dateID ];
					if ( Array.isArray( ticketsToAssign ) ) {
						relationUpdates.push(
							this.addTickets( date, ticketsToAssign )
						);
					}
				}
			}
		}
		Promise.all( relationUpdates ).then( ( updates ) => {
			const wasUpdated = filter( updates, ( updated ) => {
				return !! updated;
			} );
			this.toggleEditor( wasUpdated.length > 0 );
		} );
	};

	/**
	 * @function
	 * @param {boolean} update
	 */
	toggleEditor = ( update = false ) => {
		if ( isFunction( this.closeModal ) ) {
			if ( update && isFunction( this.onUpdate ) ) {
				this.onUpdate();
			}
			if ( isFunction( this.resetRelationsMap ) ) {
				this.resetRelationsMap();
			}
			this.setState( { submitting: false } );
			this.closeModal();
		}
	};

	/**
	 * @function
	 * @param {Object} assigned
	 * @param {Object} date
	 * @param {Object} ticket
	 * @param {boolean} returnIndex
	 * @return {number|boolean} index for date id in assigned array or
	 *  						boolean if returnIndex is false
	 */
	isAssigned = ( assigned, date, ticket, returnIndex = false ) => {
		let index = noIndex;
		if ( Array.isArray( assigned[ date.id ] ) ) {
			index = findIndex( assigned[ date.id ], { id: ticket.id } );
		}
		return returnIndex ? index : index > noIndex;
	};

	/**
	 * @function
	 * @param {Object} assigned
	 * @param {Object} date
	 * @param {Object} ticket
	 * @return {Object} assigned
	 */
	unAssignTicket = ( assigned, date, ticket ) => {
		const index = this.isAssigned( assigned, date, ticket, true );
		if ( index > noIndex ) {
			delete assigned[ date.id ][ index ];
		}
		return assigned;
	};

	/**
	 * @function
	 * @param {Object} date
	 * @param {Object} ticket
	 */
	assignTicket = ( date, ticket ) => {
		const eventDate = find(
			this.props.dates,
			{ id: date.id }
		);
		if ( eventDate ) {
			this.setState( ( prevState ) => {
				if ( ! Array.isArray( prevState.assigned[ date.id ] ) ) {
					prevState.assigned[ date.id ] = [];
				}
				if ( ! this.isAssigned( prevState.assigned, date, ticket ) ) {
					prevState.assigned[ date.id ].push( ticket );
				}
				prevState.removed = this.unRemoveTicket(
					prevState.removed,
					date,
					ticket
				);
				return ( {
					assigned: prevState.assigned,
					removed: prevState.removed,
				} );
			} );
		}
	};

	/**
	 * @function
	 * @param {Object} removed
	 * @param {Object} date
	 * @param {Object} ticket
	 * @param {boolean} returnIndex
	 * @return {number|boolean} index for date id in removed array or
	 *                        boolean if returnIndex is false
	 */
	isRemoved = ( removed, date, ticket, returnIndex = false ) => {
		let index = noIndex;
		if ( Array.isArray( removed[ date.id ] ) ) {
			index = findIndex( removed[ date.id ], { id: ticket.id } );
		}
		return returnIndex ? index : index > noIndex;
	};

	/**
	 * @function
	 * @param {Object} removed
	 * @param {Object} date
	 * @param {Object} ticket
	 * @return {Object} removed
	 */
	unRemoveTicket = ( removed, date, ticket ) => {
		const index = this.isRemoved( removed, date, ticket, true );
		if ( index > noIndex ) {
			delete removed[ date.id ][ index ];
		}
		return removed;
	};

	/**
	 * @function
	 * @param {Object} date
	 * @param {Object} ticket
	 */
	removeTicket = ( date, ticket ) => {
		const eventDate = find(
			this.props.dates,
			{ id: date.id }
		);
		if ( eventDate ) {
			this.setState( ( prevState ) => {
				if ( ! Array.isArray( prevState.removed[ date.id ] ) ) {
					prevState.removed[ date.id ] = [];
				}
				if ( ! this.isRemoved( prevState.removed, date, ticket ) ) {
					prevState.removed[ date.id ].push( ticket );
				}
				prevState.assigned = this.unAssignTicket(
					prevState.assigned,
					date,
					ticket
				);
				return ( {
					assigned: prevState.assigned,
					removed: prevState.removed,
				} );
			} );
		}
	};

	/**
	 * @function
	 * @param {Array} tickets
	 * @param {Object} cellWidth
	 * @return {Object} rendered table header cell
	 */
	ticketHeaders = ( tickets, cellWidth ) => {
		return tickets.map(
			( ticket, index1 ) => {
				if ( ! isModelEntityOfModel(
					ticket,
					TICKET
				) ) {
					return null;
				}
				return (
					<td key={ index1 } style={ cellWidth } >
						<div className="ee-dtm-ticket-header-title" >
							{ `${ ticket.name }` }
						</div>
						<div className="ee-dtm-ticket-header-price" >
							{ `${ ticket.price }` }
						</div>
					</td>
				);
			}
		);
	};

	/**
	 * @function
	 * @param {Array} dates
	 * @param {Array} tickets
	 * @param {Object} eventDateTicketMap
	 * @param {number} dateCount
	 * @param {Object} datesWidth
	 * @param {Object} cellWidth
	 * @return {Object} rendered table rows
	 */
	dateRows = (
		dates,
		tickets,
		eventDateTicketMap,
		dateCount,
		datesWidth,
		cellWidth
	) => {
		let year = 0;
		let yearRow = null;
		let indexMod = 0;
		return dates.map(
			( eventDate, index2 ) => {
				if ( ! isModelEntityOfModel(
					eventDate,
					DATETIME
				) ) {
					return null;
				}
				index2 = index2 + indexMod + 1;
				const dateYear = parseInt(
					eventDate.start.toFormat( 'YYYY' )
				);
				if ( dateCount > 1 && dateYear > year ) {
					year = dateYear;
					yearRow = this.yearRow( dateCount, year );
					indexMod++;
					index2++;
				} else {
					yearRow = null;
				}
				const eventDateTickets = eventDateTicketMap[ eventDate.id ] ?
					eventDateTicketMap[ eventDate.id ] :
					[];
				return (
					<Fragment key={ index2 }>
						{ yearRow }
						<tr>
							{
								this.dateHeader(
									eventDate,
									dateCount,
									datesWidth,
									cellWidth
								)
							}
							{
								this.ticketCells(
									eventDate,
									tickets,
									eventDateTickets,
									cellWidth
								)
							}
						</tr>
					</Fragment>
				);
			}
		);
	};

	/**
	 * @function
	 * @param {number} dateCount
	 * @param {number} year
	 * @return {Object} rendered table row
	 */
	yearRow = ( dateCount, year ) => (
		<tr>
			<td colSpan={ dateCount } className="ee-dtm-year-row-style" >
				<div>{ year }</div>
			</td>
		</tr>
	);

	/**
	 * @function
	 * @param {Object} eventDate
	 * @param {number} dateCount
	 * @param {Object} datesWidth
	 * @return {Object} rendered table cell
	 */
	dateHeader = ( eventDate, dateCount, datesWidth ) => {
		return dateCount > 1 ?
			(
				<td key={ 0 } className="ee-dtm-date-label">
					<CalendarPageDate
						startDate={ eventDate.start }
						statusClass={
							getBackgroundColorClass( eventDate )
						}
						size={ 'small' }
					/>
					<div className="ee-dtm-date-label-text">
						{ eventDate.name }
					</div>
				</td>
			) :
			null;
	};

	/**
	 * @function
	 * @param {Object} eventDate
	 * @param {Object} tickets
	 * @param {Array} eventDateTickets
	 * @param {Object} cellWidth
	 * @return {Object} rendered table cell
	 */
	ticketCells = (
		eventDate,
		tickets,
		eventDateTickets,
		cellWidth
	) => {
		return tickets.map(
			( ticket, index3 ) => {
				index3++;
				const hasTicket = findIndex(
					eventDateTickets,
					{ id: ticket.id }
				) > noIndex;
				const isAssigned = this.isAssigned(
					this.state.assigned,
					eventDate,
					ticket,
					true
				);
				const isRemoved = this.isRemoved(
					this.state.removed,
					eventDate,
					ticket,
					true
				);
				let icon = '';
				let bgColor = 'ee-dtm-ticket-relation-button';
				if ( hasTicket ) {
					if ( isRemoved > noIndex ) {
						icon = 'no';
						bgColor += ' ee-dtm-remove-ticket-relation';
					} else {
						icon = 'tickets-alt';
						bgColor += ' ee-dtm-has-ticket-relation';
					}
				} else if ( isAssigned > noIndex ) {
					icon = 'tickets-alt';
					bgColor += ' ee-dtm-add-ticket-relation';
				} else {
					icon = 'minus';
					bgColor += ' ee-dtm-no-ticket-relation';
				}
				const action = isAssigned > noIndex ||
				( hasTicket && isRemoved === noIndex ) ?
					this.removeTicket :
					this.assignTicket;
				return (
					<td key={ index3 } style={ cellWidth } >
						<IconButton
							icon={ icon }
							className={ bgColor }
							size={ 45 }
							onClick={ ( event ) => {
								event.preventDefault();
								event.stopPropagation();
								action( eventDate, ticket );
							} }
							onKeyDown={ ( event ) => {
								if ( event.keyCode === ENTER ) {
									event.preventDefault();
									event.stopPropagation();
									action( eventDate, ticket );
								}
							} }
						/>
					</td>
				);
			}
		);
	};

	render() {
		const {
			loading,
			dates,
			tickets,
			eventDateTicketMap,
			addTickets,
			removeTickets,
			onUpdate,
			closeModal,
			resetRelationsMap,
		} = this.props;
		this.addTickets = addTickets;
		this.removeTickets = removeTickets;
		this.onUpdate = onUpdate;
		this.closeModal = closeModal;
		this.resetRelationsMap = resetRelationsMap;

		const {
			FormSection,
			FormWrapper,
			FormSubmitButton,
			FormCancelButton,
			FormSaveCancelButtons,
		} = twoColumnAdminFormLayout;
		const dateCount = dates.length;
		let divisor = tickets.length ? tickets.length : 1;
		divisor += dateCount > 1 ? 2 : 0;
		let width = 100 / divisor;
		const cellWidth = {
			maxWidth: width + '%',
			width: width + '%',
		};
		width = width * 2;
		const datesWidth = {
			maxWidth: width + '%',
			width: width + '%',
		};
		const datesHeader = dateCount > 1 ? (
			<td key={ 0 } className="ee-dtm-dates-header" style={ datesWidth } />
		) : null;
		const submitButton = (
			<FormSubmitButton
				onClick={
					( event ) => {
						event.preventDefault();
						event.stopPropagation();
						this.processChanges();
					}
				}
				buttonText={ __(
					'Update Ticket Assignments',
					'event_espresso'
				) }
				submitting={ this.state.submitting }
			/>
		);
		const cancelButton = (
			<FormCancelButton
				onClick={
					( event ) => {
						event.preventDefault();
						event.stopPropagation();
						this.toggleEditor();
					}
				}
			/>
		);
		return (
			<Fragment>
				<FormPlaceholder
					loading={ loading }
					notice={ __(
						'loading event date ticket relations',
						'event_espresso'
					) }
				/>
				<FormContainer loading={ loading } >
					<FormWrapper>
						<FormSection>
							<table className="ee-date-tickets-assignments-manager">
								<thead>
									<tr>
										{ datesHeader }
										{
											this.ticketHeaders(
												tickets,
												cellWidth
											)
										}
									</tr>
								</thead>
								<tbody>
									{
										this.dateRows(
											dates,
											tickets,
											eventDateTicketMap,
											dateCount,
											datesWidth,
											cellWidth
										)
									}
								</tbody>
							</table>
						</FormSection>
						<FormSaveCancelButtons
							submitButton={ submitButton }
							cancelButton={ cancelButton }
							colSize={ 4 }
							offset={ 8 }
						/>
					</FormWrapper>
				</FormContainer>
			</Fragment>
		);
	}
}

export default withDatesAndTicketsManagerState( DatesAndTicketsManager );
