/**
 * External imports
 */
import { filter, findIndex, isFunction } from 'lodash';
import PropTypes from 'prop-types';
import warning from 'warning';
import { IconButton } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import {
	CalendarPageDate,
	ResponsiveTable,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import * as handler from './ticket-assignments-handler';
import './ticket-assignments-manager.css';

const noIndex = -1;

const {
	FormInfo,
	FormSection,
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const { getBackgroundColorClass: getDateBgColorClass } = dateTimeModel;
const { getBackgroundColorClass: getTicketBgColorClass } = ticketModel;

class TicketAssignmentsManager extends Component {
	static propTypes = {
		entities: PropTypes.arrayOf( PropTypes.object ).isRequired,
		tickets: PropTypes.arrayOf( PropTypes.object ).isRequired,
		eventDateTicketMap: PropTypes.object.isRequired,
		addTickets: PropTypes.func.isRequired,
		removeTickets: PropTypes.func.isRequired,
		closeModal: PropTypes.func.isRequired,
		allDates: PropTypes.arrayOf( PropTypes.object ),
		allTickets: PropTypes.arrayOf( PropTypes.object ),
		pagination: PropTypes.object,
		onUpdate: PropTypes.func,
		resetRelationsMap: PropTypes.func,
	};

	constructor( props ) {
		super( props );
		this.state = {
			assigned: {},
			removed: {},
			submitting: false,
			formError: '',
		};
	}

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
			this.setState( {
				assigned: {},
				removed: {},
				submitting: false,
				formError: '',
			} );
			this.closeModal();
		}
	};

	/**
	 * updates ticket date relations
	 *
	 * @function
	 */
	processChanges = () => {
		this.setState( { submitting: true } );
		handler.processChanges(
			this.props.entities,
			this.state.assigned,
			this.props.addTickets,
			this.state.removed,
			this.props.removeTickets
		).then( ( updates ) => {
			const wasUpdated = filter( updates, ( updated ) => {
				return !! updated;
			} );
			this.toggleEditor( wasUpdated.length > 0 );
		} );
	};

	/**
	 * @function
	 * @param {Object} date
	 * @param {Object} ticket
	 */
	assignTicket = ( date, ticket ) => {
		if (
			! isModelEntityOfModel( date, 'datetime' ) ||
			! isModelEntityOfModel( ticket, 'ticket' )
		) {
			return;
		}
		this.setState( ( prevState ) => {
			const newState = handler.assignTicket( prevState, date, ticket );
			return { formError: '', ...newState };
		} );
	};

	/**
	 * @function
	 * @param {Object} date
	 * @param {Object} ticket
	 */
	removeTicket = ( date, ticket ) => {
		if (
			! isModelEntityOfModel( date, 'datetime' ) ||
			! isModelEntityOfModel( ticket, 'ticket' )
		) {
			return;
		}
		this.setState( ( prevState ) => {
			const newState = handler.removeTicket( prevState, date, ticket );
			return { formError: '', ...newState };
		} );
	};

	countTicketAssignments = ( dates, tickets, eventDateTicketMap ) => {
		// console.log( 'TicketAssignmentsManager.mapTicketDates()' );
		// console.log( 'dates', dates );
		// console.log( 'tickets', tickets );
		let dateTickets = [];
		let ticketDateCount = 0;
		let dateTicketCount = 0;
		let noAssignments = 0;
		dates.forEach( ( eventDate ) => {
			dateTicketCount = 0;
			warning(
				isModelEntityOfModel( eventDate, 'datetime' ),
				'Invalid EE Date model object!'
			);
			// console.log( 'eventDate', eventDate.id, eventDate.name );
			dateTickets = eventDateTicketMap[ eventDate.id ] ?
				eventDateTicketMap[ eventDate.id ] :
				[];
			this.assignmentCounts.dates[ eventDate.id ] = dateTickets.length;
			// console.log( ' > dateTickets ', dateTickets );
			tickets.forEach( ( ticket ) => {
				warning(
					isModelEntityOfModel( ticket, 'ticket' ),
					'Invalid EE' +
					' Ticket model object!'
				);
				if ( typeof this.assignmentCounts.tickets[ ticket.id ] === 'undefined' ) {
					this.assignmentCounts.tickets[ ticket.id ] = 0;
				}
				// console.log( ' > ticket', ticket.id, ticket.name );
				const ticketAssignedToDate = findIndex(
					dateTickets,
					{ id: ticket.id }
				) > noIndex;
				// console.log( ' > > ticketAssignedToDate', ticketAssignedToDate );
				if ( ticketAssignedToDate ) {
					dateTicketCount++;
					ticketDateCount++;
					this.assignmentCounts.tickets[ ticket.id ]++;
				}
			} );
			if (
				dateTicketCount === 0 &&
				this.ticketCount > 1 &&
				! this.state.assigned[ eventDate.id ]
			) {
				noAssignments++;
			}
		} );
		if ( this.ticketCount === 1 && ticketDateCount > 0 ) {
			noAssignments = 0;
		}
		// console.log( ' > ticketDateCount', ticketDateCount );
		// console.log( ' > noAssignments', noAssignments );
		return noAssignments;
	};

	/**
	 * @function
	 * @param {Array} tickets
	 * @param {number} dateCount
	 * @return {Array} table header cell data
	 */
	ticketHeaders = ( tickets, dateCount ) => {
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
		tickets.forEach( ( ticket ) => {
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
	};

	/**
	 * @function
	 * @param {Array} dates
	 * @param {Array} tickets
	 * @param {Object} eventDateTicketMap
	 * @param {number} dateCount
	 * @return {Array} array of row data objects
	 */
	dateRows = (
		dates,
		tickets,
		eventDateTicketMap,
		dateCount,
	) => {
		let year = 0;
		const dateRows = [];
		dates.forEach(
			( eventDate ) => {
				warning(
					isModelEntityOfModel( eventDate, 'datetime' ),
					'Invalid EE Date model object!'
				);
				const dateYear = parseInt(
					eventDate.start.toFormat( 'YYYY' )
				);
				if ( dateCount > 1 && dateYear > year ) {
					year = dateYear;
					dateRows.push( this.yearRow( year, tickets ) );
				}
				const rowData = [
					{
						type: 'row',
						class: 'ee-tam-date-row',
						value: '',
					},
				];
				if ( dateCount > 1 ) {
					rowData.push( this.dateHeader( eventDate ) );
				}
				const eventDateTickets = eventDateTicketMap[ eventDate.id ] ?
					eventDateTicketMap[ eventDate.id ] :
					[];
				tickets.forEach( ( ticket ) => {
					warning(
						isModelEntityOfModel( ticket, 'ticket' ),
						'Invalid EE Ticket model object!'
					);
					rowData.push(
						this.ticketCell( eventDate, ticket, eventDateTickets )
					);
				} );
				dateRows.push( rowData );
			}
		);
		return dateRows;
	};

	/**
	 * @function
	 * @param {number} year
	 * @param {Object} tickets
	 * @return {Object} rendered table row
	 */
	yearRow = ( year, tickets ) => {
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
		tickets.forEach( () => {
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
	};

	/**
	 * @function
	 * @param {Object} eventDate
	 * @return {Object} rendered table cell
	 */
	dateHeader = ( eventDate ) => {
		return {
			type: 'cell',
			class: 'ee-tam-date-label',
			value: (
				<div className="ee-tam-date-label-div">
					<div className="ee-tam-date-id">
						{ `#${ eventDate.id }` }
					</div>
					<div className="ee-tam-date-label-text">
						{ eventDate.name }
					</div>
					<CalendarPageDate
						startDate={ eventDate.start }
						statusClass={ getDateBgColorClass( eventDate ) }
						size={ 'small' }
					/>
				</div>
			),
		};
	};

	/**
	 * @function
	 * @param {Object} date
	 * @param {Object} ticket
	 * @param {Array} dateTickets
	 * @return {Object} rendered table cell
	 */
	ticketCell = ( date, ticket, dateTickets ) => {
		// console.log( '' );
		// console.log( date.id, date.name, ticket.id, ticket.name );
		// console.log( ' > dateTickets', dateTickets );
		// console.log( ' > this.state', this.state );
		const assigned = { ...this.state.assigned };
		const removed = { ...this.state.removed };
		// console.log( ' > assigned', assigned );
		// console.log( ' > removed', removed );
		// console.log( ' > this.assignmentCounts', this.assignmentCounts );
		const ticketCountForDate = this.assignmentCounts.dates[ date.id ];
		const dateCountForTicket = this.assignmentCounts.tickets[ ticket.id ];
		const assignedTickets = handler.assignedCount( assigned, null, ticket );
		const removedTickets = handler.removedCount( removed, null, ticket );
		const assignedDates = handler.assignedCount( assigned, date );
		const removedDates = handler.removedCount( removed, date );
		const totalTicketAssignmentsForDate = ticketCountForDate +
			assignedDates -
			removedDates;
		const totalDateAssignmentsForTicket = dateCountForTicket +
			assignedTickets -
			removedTickets;
		const hasTicket = findIndex( dateTickets, { id: ticket.id } ) > noIndex;
		const isAssigned = handler.isAssigned( assigned, date, ticket, true ) > noIndex;
		const isRemoved = handler.isRemoved( removed, date, ticket, true ) > noIndex;
		// console.log( '    ticketCountForDate', ticketCountForDate );
		// console.log( '     + assignedTickets', assignedTickets );
		// console.log( '     - removedTickets', removedTickets );
		// console.log( '     = totalTicketAssignmentsForDate',
		// 	totalTicketAssignmentsForDate
		// );
		// console.log( '    dateCountForTicket', dateCountForTicket );
		// console.log( '     + assignedDates', assignedDates );
		// console.log( '     - removedDates', removedDates );
		// console.log( '     = totalDateAssignmentsForTicket',
		// 	totalDateAssignmentsForTicket
		// );
		// console.log( ' > hasTicket', hasTicket );
		// console.log( ' > isAssigned', isAssigned );
		// console.log( ' > isRemoved', isRemoved );
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
		const currentlyAssigned = isAssigned || ( hasTicket && ! isRemoved );
		const canRemoveAssignment = (
			// managing a single date so ignore other dates
			this.dateCount < 2 && totalTicketAssignmentsForDate > 1
		) || (
			// managing a single ticket so ignore other tickets
			this.ticketCount < 2 && totalDateAssignmentsForTicket > 1
		) || (
			// managing ticket assignments for all tickets and all dates so
			// both need to have more than one assignment to remove this one
			this.dateCount > 1 && totalTicketAssignmentsForDate > 1 &&
			this.ticketCount > 1 && totalDateAssignmentsForTicket > 1
		);
		// console.log( ' > > currentlyAssigned', currentlyAssigned );
		// console.log( ' > > canRemoveAssignment', canRemoveAssignment );
		let action = currentlyAssigned && canRemoveAssignment ?
			this.removeTicket :
			this.assignTicket;
		// let actionName = currentlyAssigned && canRemoveAssignment ?
		// 	'removeTicket' :
		// 	'assignTicket';
		// console.log( ' > > actionName', actionName );
		if (
			currentlyAssigned &&
			! canRemoveAssignment &&
			action === this.assignTicket
		) {
			const error = this.dateCount > 1 &&
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
				return this.formError( error );
			};

			// actionName = 'formError';
			// console.log( ' > > > ERROR', error );
		}
		const noAssignments = (
			// dealing with a single date so ignore other dates
			this.dateCount < 2 && totalTicketAssignmentsForDate === 0
		) || (
			// dealing with a single ticket so ignore other tickets
			this.ticketCount < 2 && totalDateAssignmentsForTicket === 0
		) || (
			// managing ticket assignments for all tickets and all dates so
			// if either are missing assignments then display an error
			this.dateCount > 1 && this.ticketCount > 1 && (
				totalTicketAssignmentsForDate === 0 ||
				totalDateAssignmentsForTicket === 0
			)
		) ?
			' ee-tam-assignments-error' :
			'';
		// console.log( ' > > actionName', actionName );
		// console.log( ' > > noAssignments', noAssignments );
		return {
			type: 'cell',
			class: `ee-tam-date-row-ticket${ noAssignments }`,
			value: (
				<IconButton
					icon={ icon }
					className={ bgColor }
					size={ 45 }
					onClick={ ( event ) => {
						event.preventDefault();
						event.stopPropagation();
						action( date, ticket );
					} }
					onKeyDown={ ( event ) => {
						if ( event.keyCode === ENTER ) {
							event.preventDefault();
							event.stopPropagation();
							action( date, ticket );
						}
					} }
				/>
			),
		};
	};

	/**
	 * @function
	 * @param {string} error
	 */
	formError = ( error = '' ) => {
		this.setState( { formError: error } );
	};

	/**
	 * @function
	 * @param {number} noAssignments
	 * @return {Object} rendered cancel button
	 */
	getFormError = ( noAssignments ) => {
		let formError = this.state.formError;
		if ( noAssignments > 0 ) {
			formError = this.dateCount === 1 ?
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
		return formError ?
			<FormInfo
				formInfo={ formError }
				dashicon={ 'warning' }
				dismissable={ true }
				colSize={ 10 }
				offset={ 1 }
			/> : null;
	};

	/**
	 * @function
	 * @param {Function} processChanges
	 * @return {Object} rendered submit button
	 */
	submitButton = ( processChanges ) => {
		const { FormSubmitButton } = twoColumnAdminFormLayout;
		return (
			<FormSubmitButton
				onClick={
					( event ) => {
						event.preventDefault();
						event.stopPropagation();
						processChanges();
						this.formError();
					}
				}
				buttonText={ __(
					'Update Ticket Assignments',
					'event_espresso'
				) }
				submitting={ this.state.submitting }
			/>
		);
	};

	/**
	 * @function
	 * @return {Object} rendered cancel button
	 */
	cancelButton = () => {
		const { FormCancelButton } = twoColumnAdminFormLayout;
		return (
			<FormCancelButton
				onClick={
					( event ) => {
						event.preventDefault();
						event.stopPropagation();
						this.formError();
						this.toggleEditor();
					}
				}
			/>
		);
	};

	render() {
		const {
			entities,
			tickets,
			allDates,
			allTickets,
			eventDateTicketMap,
			onUpdate,
			closeModal,
			resetRelationsMap,
			pagination,
		} = this.props;
		// console.log( '' );
		// console.log( 'TicketAssignmentsManager.render()' );
		// console.log( ' > props: ', this.props );
		const dates = entities;
		this.onUpdate = onUpdate;
		this.closeModal = closeModal;
		this.resetRelationsMap = resetRelationsMap;
		this.dateCount = dates.length;
		this.ticketCount = tickets.length;
		this.assignmentCounts = {
			dates: {},
			tickets: {},
		};
		const noAssignments = this.countTicketAssignments(
			allDates || dates,
			allTickets || tickets,
			eventDateTicketMap
		);
		// console.log( ' > ticketDates: ', this.ticketDates );
		// console.log( ' > assignmentCounts: ', this.assignmentCounts );
		// console.log( ' > noAssignments: ', noAssignments );

		const dateCount = dates.length;
		let tableId = 'ee-ticket-assignments-manager-';
		if ( dateCount === 1 ) {
			tableId += dates[ 0 ].id;
		} else {
			tableId += dateCount + '-' + tickets.length;
		}
		return (
			<FormWrapper>
				<FormSection>
					{ this.getFormError( noAssignments ) }
					<ResponsiveTable
						columns={
							this.ticketHeaders( tickets, dateCount )
						}
						rowData={
							this.dateRows(
								dates,
								tickets,
								eventDateTicketMap,
								dateCount
							)
						}
						metaData={ {
							tableId: tableId,
							tableCaption: __(
								'Ticket Assignments',
								'event_espresso'
							),
							hasRowHeaders: dateCount > 1,
						} }
						classes={ {
							tableClass: 'ee-ticket-assignments-manager',
						} }
					/>
					{ pagination }
				</FormSection>
				<FormSaveCancelButtons
					submitButton={ this.submitButton( this.processChanges ) }
					cancelButton={ this.cancelButton() }
				/>
			</FormWrapper>
		);
	}
}

export default TicketAssignmentsManager;
