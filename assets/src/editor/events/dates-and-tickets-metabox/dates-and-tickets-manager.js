/**
 * External imports
 */
import { findIndex, isFunction } from 'lodash';
import PropTypes from 'prop-types';
import warning from 'warning';
import { IconButton } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import {
	CalendarPageDate,
	ResponsiveTable,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __, _x, sprintf } from '@eventespresso/i18n';
import { dateTimeModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import * as handler from './ticket-assignments-handler';
import './dates-and-tickets-manager.css';

const noIndex = -1;

const {
	MODEL_NAME: DATETIME,
	getBackgroundColorClass: getDateBgColorClass,
} = dateTimeModel;
const {
	MODEL_NAME: TICKET,
	getBackgroundColorClass: getTicketBgColorClass,
} = ticketModel;

class DatesAndTicketsManager extends Component {
	static propTypes = {
		entities: PropTypes.arrayOf( PropTypes.object ).isRequired,
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
			} );
			this.closeModal();
		}
	};

	/**
	 * @function
	 * @param {Object} date
	 * @param {Object} ticket
	 */
	assignTicket = ( date, ticket ) => {
		if (
			! isModelEntityOfModel( date, DATETIME ) ||
			! isModelEntityOfModel( ticket, TICKET )
		) {
			return;
		}
		this.setState( ( prevState ) =>
			handler.assignTicket( prevState, date, ticket )
		);
	};

	/**
	 * @function
	 * @param {Object} date
	 * @param {Object} ticket
	 */
	removeTicket = ( date, ticket ) => {
		if (
			! isModelEntityOfModel( date, DATETIME ) ||
			! isModelEntityOfModel( ticket, TICKET )
		) {
			return;
		}
		this.setState( ( prevState ) =>
			handler.removeTicket( prevState, date, ticket )
		);
	};

	/**
	 * @function
	 * @param {Array} tickets
	 * @param {number} dateCount
	 * @return {Array} table header cell data
	 */
	ticketHeaders = ( tickets, dateCount ) => {
		// console.log( '' );
		// console.log( 'DatesAndTicketsManager.ticketHeaders()' );
		const headerCells = [];
		if ( dateCount > 1 ) {
			headerCells.push(
				{
					type: 'cell',
					class: 'ee-dtm-dates-header',
					value: '',
				}
			);
		}
		tickets.forEach( ( ticket ) => {
			warning(
				isModelEntityOfModel( ticket, TICKET ),
				'Invalid EE Ticket model object!'
			);
			let statusClass = getTicketBgColorClass( ticket );
			statusClass = `ee-dtm-ticket-header-status ${ statusClass }`;
			const saleDate = ticket.startDate.toFormat( 'MMM DD YYYY' );
			// console.log( ' > ticket: ', ticket.name );
			headerCells.push(
				{
					type: 'cell',
					class: 'ee-dtm-ticket-header',
					value: (
						<div className="ee-dtm-ticket-header-div">
							<div className={ statusClass }>
								<span className="ee-dtm-ticket-header-date">
									{ saleDate }
								</span>
							</div>
							<div className="ee-dtm-ticket-header-title">
								{ ticket.name }
							</div>
							<div className="ee-dtm-ticket-header-price">
								{ `${ ticket.price }` }
								<span className="ee-dtm-ticket-header-date">
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
		// console.log( '' );
		// console.log( 'DatesAndTicketsManager.ticketHeaders()' );
		// console.log( ' > dateCount: ', dateCount );
		let year = 0;
		const dateRows = [];
		dates.forEach(
			( eventDate ) => {
				warning(
					isModelEntityOfModel( eventDate, DATETIME ),
					'Invalid EE Date model object!'
				);
				// console.log( ' > eventDate: ', eventDate.name );
				const dateYear = parseInt(
					eventDate.start.toFormat( 'YYYY' )
				);
				if ( dateCount > 1 && dateYear > year ) {
					year = dateYear;
					dateRows.push( this.yearRow( year, tickets ) );
				}
				const eventDateTickets = eventDateTicketMap[ eventDate.id ] ?
					eventDateTicketMap[ eventDate.id ] :
					[];
				const rowData = [
					{
						type: 'row',
						class: 'ee-dtm-date-row',
					},
				];
				if ( dateCount > 1 ) {
					rowData.push( this.dateHeader( eventDate ) );
				}
				tickets.forEach( ( ticket ) => {
					warning(
						isModelEntityOfModel( ticket, TICKET ),
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
				class: 'ee-dtm-year-row',
			},
			{
				type: 'cell',
				value: year,
				class: 'ee-dtm-date-label',
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
								'ee-dtm-date-row-ticket ee-rTable-body-td'
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
			class: 'ee-dtm-date-label',
			value: (
				<div className="ee-dtm-date-label-div">
					<div className="ee-dtm-date-label-text">
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
	 * @param {Object} eventDate
	 * @param {Object} ticket
	 * @param {Array} eventDateTickets
	 * @return {Object} rendered table cell
	 */
	ticketCell = ( eventDate, ticket, eventDateTickets ) => {
		const hasTicket = findIndex(
			eventDateTickets,
			{ id: ticket.id }
		) > noIndex;
		const isAssigned = handler.isAssigned(
			this.state.assigned,
			eventDate,
			ticket,
			true
		);
		const isRemoved = handler.isRemoved(
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
		return {
			type: 'cell',
			class: 'ee-dtm-date-row-ticket',
			value: (
				<Fragment>
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
				</Fragment>
			),
		};
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
						this.toggleEditor();
					}
				}
			/>
		);
	};

	render() {
		// console.log( '' );
		// console.log( 'DatesAndTicketsManager.render()' );
		// console.log( ' > props: ', this.props );

		const {
			entities,
			tickets,
			eventDateTicketMap,
			addTickets,
			removeTickets,
			onUpdate,
			closeModal,
			resetRelationsMap,
			pagination,
		} = this.props;
		const dates = entities;
		// console.log( ' > dates: ', dates );
		this.onUpdate = onUpdate;
		this.closeModal = closeModal;
		this.resetRelationsMap = resetRelationsMap;

		const processChanges = async () => {
			this.setState( { submitting: true } );
			const wasUpdated = await handler.processChanges(
				dates,
				this.state.assigned,
				addTickets,
				this.state.removed,
				removeTickets
			);
			this.toggleEditor( wasUpdated );
		};

		const {
			FormSection,
			FormWrapper,
			FormSaveCancelButtons,
		} = twoColumnAdminFormLayout;
		const dateCount = dates.length;
		// console.log( ' > dateCount: ', dateCount );
		let tableId = 'ee-ticket-assignments-manager-';
		if ( dateCount === 1 ) {
			tableId += dates[ 0 ].id;
		} else {
			tableId += dateCount + '-' + tickets.length;
		}
		return (
			<FormWrapper>
				<FormSection>
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
					submitButton={ this.submitButton( processChanges ) }
					cancelButton={ this.cancelButton() }
				/>
			</FormWrapper>
		);
	}
}

export default DatesAndTicketsManager;
