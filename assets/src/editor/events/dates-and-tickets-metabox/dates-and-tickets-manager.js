/**
 * External imports
 */

import { filter, find, findIndex } from 'lodash';
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

	toggleEditor = ( update = false ) => {
		if ( this.props.closeModal &&
			typeof this.props.closeModal === 'function'
		) {
			if ( update && this.props.onUpdate &&
				typeof this.props.onUpdate === 'function'
			) {
				this.props.onUpdate();
			}
			this.resetRelationsMap();
			this.setState( { submitting: false } );
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
		const {
			loading,
			dates,
			tickets,
			eventDateTicketMap,
			resetRelationsMap,
			addTickets,
			removeTickets,
		} = this.props;
		this.resetRelationsMap = resetRelationsMap;
		this.addTickets = addTickets;
		this.removeTickets = removeTickets;

		const {
			FormSection,
			FormWrapper,
			FormSubmitButton,
			FormCancelButton,
			FormSaveCancelButtons,
		} = twoColumnAdminFormLayout;
		// console.log( '' );
		// console.log( 'DatesAndTicketsManager.render()' );
		// console.log( ' > props: ', this.props );
		// console.log( ' > addTickets: ', addTickets );
		const width = tickets.length ? 75 / tickets.length : 75;
		const header0 = {
			borderBottom: '1px solid var(--ee-lite-grey)',
			maxWidth: '25%',
			textAlign: 'left',
			verticalAlign: 'bottom',
			width: '25%',
		};
		const header = {
			borderBottom: '1px solid var(--ee-lite-grey)',
			boxSizing: 'border-box',
			padding: '0 5px',
			maxWidth: width + '%',
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
			lineHeight: '16px',
			overflow: 'hidden',
			padding: '3px 10px',
			textOverflow: 'ellipsis',
			verticalAlign: 'middle',
			whiteSpace: 'nowrap',
		};
		const yearRowStyle = {
			color: 'var(--ee-grey-white)',
			fontWeight: 'bold',
			letterSpacing: '3px',
			lineHeight: '16px',
			padding: '10px 10px 1px 10px',
			textAlign: 'left',
			verticalAlign: 'middle',
			width: '100%',
		};
		// const container = {
		// 	boxSizing: 'border-box',
		// 	padding: '25px',
		// 	minWidth: '600px',
		// };
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
		const getRowStyle = ( index ) => ( index - 1 ) % 2 === 1 ?
			odd :
			{};
		let year = 0;
		let yearRow = null;
		let indexMod = 0;
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
												index2 = index2 + indexMod + 1;
												const dateYear = parseInt(
													eventDate.start.toFormat( 'YYYY' )
												);
												if ( showDatesColumn && dateYear > year ) {
													year = dateYear;
													yearRow = (
														<tr style={ getRowStyle( index2 ) } >
															<td
																key={ 0 }
																colSpan={ 2 }
																style={ yearRowStyle }
															>
																<div>
																	{ year }
																</div>
															</td>
														</tr>
													);
													indexMod++;
													index2++;
												} else {
													yearRow = null;
												}
												// console.log( '' );
												// console.log( 'DatesAndTicketsManager.render(293)' );
												// console.log( ' > eventDate: ', eventDate );
												const eventDateTickets = eventDateTicketMap[
													eventDate.id
												] ?
													eventDateTicketMap[ eventDate.id ] :
													[];
												const rowStyle = getRowStyle( index2 );
												const dateHeader = showDatesColumn ?
													(
														<td key={ 0 } style={ dateLabel }>
															<div style={ { display: 'inline-block' } }>
																<CalendarPageDate
																	startDate={
																		eventDate.start
																	}
																	statusClass={
																		getBackgroundColorClass(
																			eventDate
																		)
																	}
																	size={ 'tiny' }
																	style={ {
																		border: '1px solid var(--ee-off-white)',
																		display: 'inline-block',
																		margin: '1px 10px 1px 0',
																	} }
																/>
															</div>
															<span
																style={ {
																	display: 'inline-block',
																	fontSize: '16px',
																	position: 'relative',
																	top: '-8px',
																} }>
																{ eventDate.name }
															</span>
														</td>
													) :
													null;
												return (
													<Fragment key={ index2 }>
														{ yearRow }
														<tr style={ rowStyle }>
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
													</Fragment>
												);
											}
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
