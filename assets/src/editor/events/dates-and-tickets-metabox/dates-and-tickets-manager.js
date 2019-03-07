/**
 * External imports
 */

import { withState, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { find, findIndex } from 'lodash';
import { ENTER } from '@wordpress/keycodes';
import { Button, IconButton, Spinner } from '@wordpress/components';
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
		let update = false;
		for ( let dateID in this.state.removed ) {
			dateID = parseInt( dateID );
			if ( this.state.removed.hasOwnProperty( dateID ) ) {
				const ticketsToRemove = this.state.removed[ dateID ];
				if ( Array.isArray( ticketsToRemove ) ) {
					ticketsToRemove.map(
						( ticketToRemove ) => {
							const date = find(
								this.props.dates,
								{ id: dateID }
							);
							if ( date !== undefined ) {
								const index = findIndex(
									date.tickets,
									{ id: ticketToRemove.id }
								);
								if ( index > noIndex ) {
									date.tickets.splice( index, 1 );
									update = true;
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
				const ticketsToAssign = this.state.assigned[ dateID ];
				if ( Array.isArray( ticketsToAssign ) ) {
					ticketsToAssign.map(
						( ticketToAssign ) => {
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
									date.tickets.push( ticketToAssign );
									update = true;
								}
							}
						}
					);
				}
			}
		}
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
		let index = noIndex;
		if ( Array.isArray( assigned[ date.id ] ) ) {
			index = findIndex( assigned[ date.id ], { id: ticket.id } );
		}
		return returnIndex ? index : index > noIndex;
	};

	unAssignTicket = ( assigned, date, ticket ) => {
		const index = this.isAssigned( assigned, date, ticket, true );
		if ( index > noIndex ) {
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
				return ( {
					assigned: prevState.assigned,
					removed: prevState.removed,
				} );
			} );
		}
	};

	isRemoved = ( removed, date, ticket, returnIndex = false ) => {
		let index = noIndex;
		if ( Array.isArray( removed[ date.id ] ) ) {
			index = findIndex( removed[ date.id ], { id: ticket.id } );
		}
		return returnIndex ? index : index > noIndex;
	};

	unRemoveTicket = ( removed, date, ticket ) => {
		const index = this.isRemoved( removed, date, ticket, true );
		if ( index > noIndex ) {
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
				return ( {
					assigned: prevState.assigned,
					removed: prevState.removed,
				} );
			} );
		}
	};

	render() {
		const { loading, dates, tickets, eventDateTicketMap } = this.props;
		if ( loading ) {
			return <Spinner />;
		}
		console.log( '' );
		console.log( 'DatesAndTicketsManager.render()' );
		console.log( ' > props: ', this.props );
		const width = tickets.length ? 75 / tickets.length : 75;
		const header0 = {
			borderBottom: '1px solid var(--ee-lite-grey)',
			textAlign: 'left',
			verticalAlign: 'bottom',
			width: '25%',
		};
		const header = {
			borderBottom: '1px solid var(--ee-lite-grey)',
			boxSizing: 'border-box',
			padding: '0 5px',
			textAlign: 'center',
			verticalAlign: 'bottom',
			width: width + '%',
		};
		const headerText = {
			display: 'block',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		};
		const dateLabel = {
			display: 'block',
			lineHeight: '38px',
			overflow: 'hidden',
			padding: '0 0 0 10px',
			textOverflow: 'ellipsis',
			verticalAlign: 'middle',
			whiteSpace: 'nowrap',
		};
		const container = {
			boxSizing: 'border-box',
			padding: '25px',
			minWidth: '600px',
		};
		const tbl = {
		};
		const cell = {
			textAlign: 'center',
		};
		const btn = {
			margin: '0 auto',
		};
		const odd = {
			background: 'var(--ee-not-quite-white)',
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
									console.log( '' );
									console.log( 'DatesAndTicketsManager.render(293)' );
									console.log( ' > eventDate: ', eventDate );
									const eventDateTickets = eventDateTicketMap[
										eventDate.id
									] ?
										eventDateTicketMap[ eventDate.id ] :
										[];

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
														let style = btn;
														if ( ! hasTicket && isAssigned > noIndex ) {
															style = {
																...style,
																...{ color: 'var(--ee-brite-green)' },
															};
														}
														if ( hasTicket && isRemoved > noIndex ) {
															style = {
																...style,
																...{ color: 'var(--ee-red)' },
															};
														}
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

// /**
//  * Enhanced DatesAndTicketsManager with Modal
//  */
// const DatesAndTicketsManagerModal = withEditorModal( {
// 	title: __( 'Event Date Ticket Assignments', 'event_espresso' ),
// 	customClass: 'ee-event-date-tickets-manager-modal',
// 	closeButtonLabel: __( 'close event date tickets manager', 'event_espresso' ),
// } )( DatesAndTicketsManager );
//
// export default DatesAndTicketsManagerModal;

/**
 * Enhanced DatesAndTicketsManager with Modal
 */

export default compose( [
	withEditorModal( {
		title: __( 'Event Date Ticket Assignments', 'event_espresso' ),
		customClass: 'ee-event-date-tickets-manager-modal',
		closeButtonLabel: __( 'close event date tickets manager',
			'event_espresso'
		),
	} ),
	withState( {
		loading: true,
		dates: [],
		tickets: [],
		eventDateTicketMap: [],
	} ),
	withSelect( ( select, ownProps ) => {
		console.log( '' );
		console.log( 'DatesAndTicketsManager.withSelect(1)' );
		console.log( ' > ownProps: ', ownProps );
		const {
			loading,
			date,
			allDates,
			ticket,
			allTickets,
			setState,
			dates,
			tickets,
		} = ownProps;
		let { eventDateTicketMap } = ownProps;
		let dtmProps = {
			loading: true,
			dates: dates,
			tickets: tickets,
			eventDateTicketMap: eventDateTicketMap,
		};
		if ( ! loading ) {
			console.log( ' > dtmProps: ', dtmProps );
			return dtmProps;
		}
		if ( isModelEntityOfModel( date, DATETIME ) ) {
			console.log( ' > date: ', date );
			const { getRelatedEntities } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			console.log( ' > > Fetching Related Entities' );
			const relatedTickets = getRelatedEntities( date, TICKET );
			const relationsResolved = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ date, TICKET ]
			);
			console.log( ' > > > relationsResolved:', relationsResolved );
			if ( ! relationsResolved || ! Array.isArray( relatedTickets ) ) {
				return dtmProps;
			}
			dtmProps = {
				loading: false,
				dates: [ date ],
				tickets: allTickets,
				eventDateTicketMap: { [ date.id ]: relatedTickets },
			};
			setState( dtmProps );
		} else if ( isModelEntityOfModel( ticket, TICKET ) ) {
			console.log( ' > ticket: ', ticket );
			const { getRelatedEntities } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			console.log( ' > > Fetching Related Entities' );
			const relatedDates = getRelatedEntities( ticket, DATETIME );
			const relationsResolved = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ ticket, DATETIME ]
			);
			console.log( ' > > > relationsResolved:', relationsResolved );
			if ( ! relationsResolved || ! Array.isArray( relatedDates ) ) {
				return dtmProps;
			}
			console.log( ' > > > relatedDates:', relatedDates );
			eventDateTicketMap = [];
			for ( let x = 0; x < relatedDates.length; x++ ) {
				const relatedDate = relatedDates[ x ];
				if ( isModelEntityOfModel( relatedDate, DATETIME ) ) {
					eventDateTicketMap[ relatedDate.id ] = ticket;
				}
			}
			dtmProps = {
				loading: false,
				dates: allDates,
				tickets: [ ticket ],
				eventDateTicketMap: eventDateTicketMap,
			};
			setState( dtmProps );
		}
		console.log( ' > final dtmProps: ', dtmProps );
		return dtmProps;
	} ),
	withSelect( ( select, ownProps ) => {
		console.log( '' );
		console.log( 'DatesAndTicketsManager.withSelect(2)' );
		console.log( ' > ownProps: ', ownProps );
		const { loading, dates, tickets, eventDateTicketMap } = ownProps;
		if ( loading ) {
			return {
				loading,
				dates,
				tickets,
				eventDateTicketMap,
			};
		}
	} ),
] )( DatesAndTicketsManager );
