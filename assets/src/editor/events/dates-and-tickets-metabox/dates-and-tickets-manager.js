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
	 * @param {Array} tickets
	 * @param {Object} cellWidth
	 * @return {Object} rendered table header cell
	 */
	ticketHeaders = ( tickets, cellWidth = null ) => {
		return tickets.map(
			( ticket, index1 ) => {
				if ( ! isModelEntityOfModel(
					ticket,
					TICKET
				) ) {
					return null;
				}
				/*  */
				return (
					<div
						key={ index1 }
						className="ee-dtm-ticket-header"
						// style={ cellWidth }
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
	 * @param {Object} datesWidth
	 * @param {Object} cellWidth
	 * @return {Object} rendered table rows
	 */
	dateRows = (
		dates,
		tickets,
		eventDateTicketMap,
		dateCount,
		datesWidth = null,
		cellWidth = null
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
					yearRow = this.yearRow( year, datesWidth );
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
						<div className="ee-dtm-date-row">
							{
								this.dateHeader(
									eventDate,
									dateCount,
									datesWidth
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
						</div>
					</Fragment>
				);
			}
		);
	};

	/**
	 * @function
	 * @param {number} year
	 * @param {Object} datesWidth
	 * @return {Object} rendered table row style={ datesWidth }
	 */
	yearRow = ( year, datesWidth ) => (
		<div className="ee-dtm-year-row">
			<div className="ee-dtm-date-label">{ year }</div>
			{
				this.props.tickets.map( ( i ) => (
					<div key={ i } className="ee-dtm-date-row-ticket" ></div>
				) )
			}
		</div>
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
				<div
					key={ 0 }
					className="ee-dtm-date-label"
					// style={ datesWidth }
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
					handler.removeTicket :
					handler.assignTicket;
				return (
					<div
						key={ index3 }
						className="ee-dtm-date-row-ticket"
						// style={ cellWidth }
					>
						<IconButton
							icon={ icon }
							className={ bgColor }
							size={ 45 }
							onClick={ ( event ) => {
								event.preventDefault();
								event.stopPropagation();
								action(
									this.setState,
									this.props.dates,
									eventDate,
									ticket
								);
							} }
							onKeyDown={ ( event ) => {
								if ( event.keyCode === ENTER ) {
									event.preventDefault();
									event.stopPropagation();
									action(
										this.setState,
										this.props.dates,
										eventDate,
										ticket
									);
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
			<div
				key={ 0 }
				className="ee-dtm-dates-header"
				// style={ datesWidth }
			/>
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
										this.ticketHeaders(
											tickets,
											cellWidth
										)
									}
								</div>
								<div className="ee-dtm-body">
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
								</div>
							</div>
						</FormSection>
						<FormSaveCancelButtons
							submitButton={ this.submitButton( processChanges ) }
							cancelButton={ this.cancelButton() }
							colSize={ 8 }
							offset={ 4 }
						/>
					</FormWrapper>
				</FormContainer>
			</Fragment>
		);
	}
}

export default withDatesAndTicketsManagerState( DatesAndTicketsManager );
