/**
 * External imports
 */
import { findIndex, isFunction } from 'lodash';
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
import * as handler from './ticket-assignments-handler';
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
	 * @return {Object} rendered table header cell
	 */
	ticketHeaders = ( tickets ) => {
		return tickets.map(
			( ticket, index1 ) => {
				if ( ! isModelEntityOfModel(
					ticket,
					TICKET
				) ) {
					return null;
				}
				return (
					<div
						key={ index1 }
						className="ee-dtm-ticket-header"
					>
						<div className="ee-dtm-ticket-header-title" >
							{ `${ ticket.name }` }
						</div>
						<div className="ee-dtm-ticket-header-price" >
							{ `${ ticket.price }` }
						</div>
					</div>
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
	 * @return {Object} rendered table rows
	 */
	dateRows = (
		dates,
		tickets,
		eventDateTicketMap,
		dateCount,
	) => {
		let year = 0;
		let yearRow = null;
		return dates.map(
			( eventDate, index2 ) => {
				if ( ! isModelEntityOfModel(
					eventDate,
					DATETIME
				) ) {
					return null;
				}
				const dateYear = parseInt(
					eventDate.start.toFormat( 'YYYY' )
				);
				if ( dateCount > 1 && dateYear > year ) {
					year = dateYear;
					yearRow = this.yearRow( year );
				} else {
					yearRow = null;
				}
				const eventDateTickets = eventDateTicketMap[ eventDate.id ] ?
					eventDateTicketMap[ eventDate.id ] :
					[];
				return (
					<Fragment key={ index2 }>
						{ yearRow }
						<div className="ee-dtm-date-row">
							{ this.dateHeader( eventDate, dateCount ) }
							{
								this.ticketCells(
									eventDate,
									tickets,
									eventDateTickets
								)
							}
						</div>
					</Fragment>
				);
			}
		);
	};

	/**
	 * @function
	 * @param {number} year
	 * @return {Object} rendered table row
	 */
	yearRow = ( year ) => (
		<div className="ee-dtm-year-row">
			<div className="ee-dtm-date-label">{ year }</div>
			{
				this.props.tickets.map( ( ticket, i ) => {
					i++;
					return (
						<div key={ i } className="ee-dtm-date-row-ticket"></div>
					);
				} )
			}
		</div>
	);

	/**
	 * @function
	 * @param {Object} eventDate
	 * @param {number} dateCount
	 * @return {Object} rendered table cell
	 */
	dateHeader = ( eventDate, dateCount ) => {
		return dateCount > 1 ?
			(
				<div
					key={ 0 }
					className="ee-dtm-date-label"
				>
					<div className="ee-dtm-date-label-text">
						{ eventDate.name }
					</div>
					<CalendarPageDate
						startDate={ eventDate.start }
						statusClass={
							getBackgroundColorClass( eventDate )
						}
						size={ 'small' }
					/>
				</div>
			) :
			null;
	};

	/**
	 * @function
	 * @param {Object} eventDate
	 * @param {Object} tickets
	 * @param {Array} eventDateTickets
	 * @return {Object} rendered table cell
	 */
	ticketCells = ( eventDate, tickets, eventDateTickets ) => {
		return tickets.map(
			( ticket, index3 ) => {
				index3++;
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
				return (
					<div
						key={ index3 }
						className="ee-dtm-date-row-ticket"
					>
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
					</div>
				);
			}
		);
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
		const datesHeader = dateCount > 1 ? (
			<div className="ee-dtm-dates-header" />
		) : null;
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
							<div className="ee-date-tickets-manager-wrapper">
								<div className="ee-dtm-header">
									{ datesHeader }
									{
										this.ticketHeaders( tickets )
									}
								</div>
								<div className="ee-dtm-body">
									{
										this.dateRows(
											dates,
											tickets,
											eventDateTicketMap,
											dateCount
										)
									}
								</div>
							</div>
						</FormSection>
						<FormSaveCancelButtons
							submitButton={ this.submitButton( processChanges ) }
							cancelButton={ this.cancelButton() }
						/>
					</FormWrapper>
				</FormContainer>
			</Fragment>
		);
	}
}

export default withDatesAndTicketsManagerState( DatesAndTicketsManager );
