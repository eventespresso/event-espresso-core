/**
 * External imports
 */
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { find, findIndex } from 'lodash';
import { ENTER } from '@wordpress/keycodes';
import { Button, IconButton } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/higher-order-components';
import { dateTimeModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const noIndex = -1;

const { MODEL_NAME: DATETIME } = dateTimeModel;
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
		};
	}

	processChanges = () => {
		// console.log( '' );
		// console.log( 'DatesAndTicketsManager.processChanges()' );
		// console.log( ' > dates', this.props.dates );
		// console.log( ' > tickets', this.props.tickets );
		// console.log( ' > assigned', this.state.assigned );
		// console.log( ' > removed', this.state.removed );
		let update = false;
		for ( let dateID in this.state.removed ) {
			dateID = parseInt( dateID );
			if ( this.state.removed.hasOwnProperty( dateID ) ) {
				// console.log( ' > > dateID', dateID );
				const ticketsToRemove = this.state.removed[ dateID ];
				// console.log( ' > > ticketsToRemove', ticketsToRemove );
				if ( Array.isArray( ticketsToRemove ) ) {
					ticketsToRemove.map(
						( ticketToRemove ) => {
							// console.log(
							// 	' > > > ticketToRemove',
							// 	ticketToRemove
							// );
							const date = find(
								this.props.dates,
								{ id: dateID }
							);
							if ( date !== undefined ) {
								// console.log( ' > > > date', date );
								const index = findIndex(
									date.tickets,
									{ id: ticketToRemove.id }
								);
								// console.log( ' > > > index', index );
								if ( index > noIndex ) {
									// console.log(
									// 	' > > > > date.tickets',
									// 	date.tickets
									// );
									// console.log(
									// 	' > > > > DELETE',
									// 	date.tickets[ index ]
									// );
									date.tickets.splice( index, 1 );
									update = true;
									// console.log(
									// 	' > > > > deleted?',
									// 	typeof date.tickets[ index ] === 'undefined'
									// );
									// console.log(
									// 	' > > > > date.tickets',
									// 	date.tickets
									// );
								}
							}
						}
					);
				}
			}
		}
		for ( let dateID in this.state.assigned ) {
			dateID = parseInt( dateID );
			if ( this.state.assigned.hasOwnProperty( dateID ) ) {
				// console.log( ' > > dateID', dateID );
				const ticketsToAssign = this.state.assigned[ dateID ];
				// console.log( ' > > ticketsToAssign', ticketsToAssign );
				if ( Array.isArray( ticketsToAssign ) ) {
					ticketsToAssign.map(
						( ticketToAssign ) => {
							// console.log(
							// 	' > > > ticketToAssign',
							// 	ticketToAssign
							// );
							const date = find(
								this.props.dates,
								{ id: dateID }
							);
							if ( date !== undefined ) {
								const index = findIndex(
									date.tickets,
									{ id: ticketToAssign.id }
								);
								if ( index === noIndex &&
									Array.isArray( date.tickets )
								) {
									// console.log(
									// 	' > > > > date.tickets.length',
									// 	date.tickets.length
									// );
									// console.log(
									// 	' > > > > date.tickets',
									// 	date.tickets
									// );
									date.tickets.push( ticketToAssign );
									update = true;
									// console.log(
									// 	' > > > > date.tickets.length',
									// 	date.tickets.length
									// );
									// console.log(
									// 	' > > > > date.tickets',
									// 	date.tickets
									// );
								}
							}
						}
					);
				}
			}
		}
		// console.log(
		// 	'typeof this.props.toggleEditor',
		// 	typeof this.props.toggleEditor
		// );
		// console.log(
		// 	'this.props.toggleEditor',
		// 	this.props.toggleEditor
		// );
		this.toggleEditor( update );
	};

	toggleEditor = ( update = false ) => {
		if ( this.props.closeModal &&
			typeof this.props.closeModal === 'function'
		) {
			if ( update && this.props.onUpdate &&
				typeof this.props.onUpdate === 'function'
			) {
				this.props.onUpdate();
			}
			this.props.closeModal();
		}
	};

	isAssigned = ( assigned, date, ticket, returnIndex = false ) => {
		let index = -1;
		if ( Array.isArray( assigned[ date.id ] ) ) {
			index = findIndex( assigned[ date.id ], { id: ticket.id } );
		}
		return returnIndex ? index : index > -1;
	};

	unAssignTicket = ( assigned, date, ticket ) => {
		const index = this.isAssigned( assigned, date, ticket, true );
		if ( index > -1 ) {
			delete assigned[ date.id ][ index ];
		}
		return assigned;
	};

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
				// console.log( '' );
				// console.log( 'DatesAndTicketsManager.assignTicket()' );
				// console.log( ' >  prevState.assigned', prevState.assigned );
				// console.log( ' >  prevState.removed', prevState.removed );
				return ( {
					assigned: prevState.assigned,
					removed: prevState.removed,
				} );
			} );
		}
	};

	isRemoved = ( removed, date, ticket, returnIndex = false ) => {
		let index = -1;
		if ( Array.isArray( removed[ date.id ] ) ) {
			index = findIndex( removed[ date.id ], { id: ticket.id } );
		}
		if ( date.id === 26 && ticket.id === 29 ) {
			// console.log( '' );
			// console.log( 'DatesAndTicketsManager.isRemoved()' );
			// console.log( ' > index', index );
		}
		return returnIndex ? index : index > -1;
	};

	unRemoveTicket = ( removed, date, ticket ) => {
	// 	console.log( '' );
	// 	console.log( 'DatesAndTicketsManager.unRemoveTicket()' );
		const index = this.isRemoved( removed, date, ticket, true );
		if ( index > -1 ) {
			delete removed[ date.id ][ index ];
		}
		return removed;
	};

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
				// console.log( '' );
				// console.log( 'DatesAndTicketsManager.removeTicket()' );
				// console.log( ' >  prevState.assigned', prevState.assigned );
				// console.log( ' >  prevState.removed', prevState.removed );
				return ( {
					assigned: prevState.assigned,
					removed: prevState.removed,
				} );
			} );
		}
	};

	render() {
		// console.log( '' );
		// console.log( 'DatesAndTicketsManager.render()' );
		// console.log( ' > this.props', this.props );
		// console.log( ' > dates', this.props.dates );
		// console.log( ' > tickets', this.props.tickets );
		// console.log( ' > eventDateTicketMap', this.props.eventDateTicketMap );
		// console.log( ' > assigned', this.state.assigned );
		// console.log( ' > removed', this.state.removed );
		const { dates, tickets, eventDateTicketMap } = this.props;
		// const { filterEntity, filterFor = 'all' } = this.props;
		// if ( filterFor === 'date' ) {
		// 	tickets = this.filterForDate( dates, filterEntity );
		// } else if ( filterFor === 'ticket' ) {
		// 	dates = this.filterForTicket( tickets, filterEntity );
		// }
		const width = tickets.length ? 75 / tickets.length : 75;
		const header0 = {
			// background: '#f8f8f8',
			borderBottom: '1px solid #ccc',
			textAlign: 'left',
			verticalAlign: 'bottom',
			width: '25%',
			// width: '300px',
		};
		const header = {
			// background: '#f8f8f8',
			borderBottom: '1px solid #ccc',
			boxSizing: 'border-box',
			// height: '120px',
			padding: '0 5px',
			textAlign: 'center',
			verticalAlign: 'bottom',
			width: width + '%',
			// width: '120px',
		};
		const headerText = {
			display: 'block',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			// maxWidth: '120px',
		};
		const dateLabel = {
			display: 'block',
			lineHeight: '38px',
			overflow: 'hidden',
			padding: '0 0 0 10px',
			textOverflow: 'ellipsis',
			verticalAlign: 'middle',
			whiteSpace: 'nowrap',
			// width: '30%',
			// width: '300px',
		};
		const container = {
			// borderTop: '1px solid #eee',
			// borderLeft: '1px solid #eee',
			boxSizing: 'border-box',
			padding: '25px',
			minWidth: '600px',
		};
		const tbl = {
			// borderTop: '1px solid #eee',
			// borderLeft: '1px solid #eee',
			// width: '100%',
		};
		const cell = {
			textAlign: 'center',
		};
		const btn = {
			margin: '0 auto',
		};
		const odd = {
			background: '#f8f8f8',
		};
		const showDatesColumn = dates.length > 1;
		const datesHeader = showDatesColumn ?
			( <td key={ 0 } style={ header0 }></td> ) :
			null;
		return (
			<div style={ container }>
				<table style={ tbl }>
					<thead>
						<tr>
							{ datesHeader }
							{
								tickets.map(
									( ticket, index1 ) => {
										if ( ! isModelEntityOfModel(
											ticket,
											TICKET
										) ) {
											return null;
										}
										return (
											<td key={ index1 } style={ header }>
												<span style={ headerText }>
													{ `${ ticket.name }` }
													<br />
													{ `$${ ticket.price }` }
												</span>
											</td>
										);
									}
								)
							}
						</tr>
					</thead>
					<tbody>
						{
							dates.map(
								( eventDate, index2 ) => {
									if ( ! isModelEntityOfModel(
										eventDate,
										DATETIME
									) ) {
										return null;
									}
									index2++;
									const eventDateTickets = eventDateTicketMap[
										eventDate.id
									] ?
										eventDateTicketMap[ eventDate.id ] :
										[];
									console.log( '' );
									console.log( 'eventDate:', eventDate.id );
									// console.log(
									// 	'eventDate',
									// 	eventDate.id,
									// 	'eventDateTickets',
									// 	eventDateTickets
									// );

									const rowStyle = ( index2 - 1 ) % 2 === 1 ?
										odd :
										{};
									const dateHeader = showDatesColumn ?
										(
											<td key={ 0 } style={ dateLabel }>
												{
													`${
														eventDate.start.toFormat(
															'ddd MMM DD, YYYY'
														)
													} - ${ eventDate.name }`
												}
											</td>
										) :
										null;
									return (
										<tr key={ index2 } style={ rowStyle }>
											{ dateHeader }
											{
												tickets.map(
													( ticket, index3 ) => {
														index3++;
														// const hasTicket = indexOf(
														// 	eventDateTickets,
														// 	ticket
														// ) > noIndex;
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
														const icon = ( hasTicket && isRemoved === noIndex ) ||
														isAssigned > noIndex ?
															'tickets-alt' :
															'no-alt';
														// if (
														// 	eventDate.id === 19 &&
														// 	ticket.id === 29
														// ) {
														// 	console.log(
														// 		'> hasTicket',
														// 		hasTicket
														// 	);
														// 	console.log(
														// 		'> isAssigned',
														// 		isAssigned
														// 	);
														// 	console.log(
														// 		'> isRemoved',
														// 		isRemoved
														// 	);
														// 	console.log( '' );
														// }
														let style = btn;
														if ( ! hasTicket && isAssigned > noIndex ) {
															style = {
																...style,
																...{ color: 'green' },
															};
														}
														if ( hasTicket && isRemoved > noIndex ) {
															style = {
																...style,
																...{ color: 'red' },
															};
														}
														// console.log(
														// 	'eventDate',
														// 	eventDate.id,
														// 	'hasTicket',
														// 	ticket.id,
														// 	hasTicket,
														// 	'or is new',
														// 	isNew,
														// 	'or yoinked',
														// 	isYoinked
														// );
														const action = ( hasTicket && isRemoved === noIndex ) ||
														isAssigned > noIndex ?
															this.removeTicket :
															this.assignTicket;
														return (
															<td key={ index3 }
																style={ cell }
															>
																<IconButton
																	icon={ icon }
																	style={ style }
																	onClick={
																		( event ) => {
																			event.preventDefault();
																			event.stopPropagation();
																			action(
																				eventDate,
																				ticket
																			);
																		}
																	}
																	onKeyDown={
																		( event ) => {
																			if ( event.keyCode === ENTER ) {
																				event.preventDefault();
																				event.stopPropagation();
																				action(
																					eventDate,
																					ticket
																				);
																			}
																		}
																	}
																/>
															</td>
														);
													}
												)
											}
										</tr>
									);
								}
							)
						}
					</tbody>
				</table>
				<br />
				<Button
					onClick={
						( event ) => {
							event.preventDefault();
							event.stopPropagation();
							this.processChanges();
						}
					}
					isPrimary
					isLarge
				>
					{ __( 'Update Ticket Assignments', 'event_espresso' ) }
				</Button>
				<Button
					onClick={
						( event ) => {
							event.preventDefault();
							event.stopPropagation();
							this.toggleEditor();
						}
					}
					isDefault
				>
					{ __( 'Cancel', 'event_espresso' ) }
				</Button>
			</div>
		);
	}
}

/**
 * Enhanced DatesAndTicketsManager with Modal
 */
const DatesAndTicketsManagerModal = withEditorModal( {
	title: __( 'Event Date Ticket Assignments', 'event_espresso' ),
	customClass: 'ee-event-date-tickets-manager-modal',
	closeButtonLabel: __( 'close event date tickets manager', 'event_espresso' ),
} )( DatesAndTicketsManager );

export default DatesAndTicketsManagerModal;
