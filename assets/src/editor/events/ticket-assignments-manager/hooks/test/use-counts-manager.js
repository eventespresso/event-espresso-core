/**
 * External imports
 */
import TestRenderer, { act } from 'react-test-renderer';
import {
	AuthedDateTimeResponse,
	AuthedTicketResponse,
	TicketFactory,
	DateTimeFactory,
} from '@test/fixtures';

/**
 * Internal imports
 */
import useCountsManager from '../use-counts-manager';

const expectedMessages = {
	singleDate: 'Event Dates must always have at least one Ticket assigned to them. If the current assignment is not correct, assign the correct Ticket first, then remove others as required.',
	singleTicket: 'Tickets must always have at least one Event Date assigned to them. If the current assignment is not correct, assign the correct Event Date first, then remove others as required.',
	multiple: 'Event Dates must always have at least one Ticket assigned to them but one or more of the Event Dates below does not have any. Please correct the assignments for the highlighted cells.',
};

describe( 'useCountsManager', () => {
	let allTickets = [],
		allDates = [],
		testedTicketEntities = [],
		testedDateEntities = [],
		testedAssignedState = { assigned: {}, removed: {} },
		testedAssignedCounts = { dates: {}, tickets: {} },
		renderer;
	beforeEach( () => {
		allTickets = [ 10, 20, 30 ].map(
			( id ) => {
				return TicketFactory
					.fromExisting(
						{ ...AuthedTicketResponse, TKT_ID: id }
					);
			}
		);
		allDates = [ 40, 50, 60 ].map(
			( id ) => {
				return DateTimeFactory
					.fromExisting(
						{ ...AuthedDateTimeResponse, DTT_ID: id }
					);
			}
		);
	} );
	afterEach( () => {
		allTickets = [];
		allDates = [];
		testedAssignedCounts = { dates: {}, tickets: {} };
		testedTicketEntities = [];
		testedDateEntities = [];
		testedAssignedState = { assigned: {}, removed: {} };
		renderer = undefined;
	} );

	const TestComponent = ( {
		dateEntities,
		ticketEntities,
		assignedCounts,
		assignedState,
	} ) => {
		const [ hasNoAssignments, noAssignmentsMessage, updatedAssignmentCounts ] = useCountsManager(
			dateEntities,
			ticketEntities,
			assignedCounts,
			assignedState
		);
		return <div
			key={ 'testDiv' }
			hasNoAssignments={ hasNoAssignments }
			noAssignmentsMessage={ noAssignmentsMessage }
			assignmentCounts={ updatedAssignmentCounts }
		/>;
	};
	const getTestComponent = ( props ) => ( updatedProps = {} ) =>
		<TestComponent key={ 'testComponent' } { ...props } { ...updatedProps } />;

	describe( 'returns expected values when processing one ticket with many ' +
		'dates', () => {
		beforeEach(
			() => {
				testedAssignedCounts = {
					dates: {
						40: 1,
						50: 1,
						60: 2,
					},
					tickets: {
						10: 3,
						20: 1,
					},
				};
				testedTicketEntities = [ allTickets[ 0 ] ];
				// initially assigned state is empty.
			}
		);

		it( 'it returns expected values when tickets and dates all have an ' +
			'assignment', () => {
			act( () => {
				renderer = TestRenderer.create( getTestComponent( {
					dateEntities: allDates,
					ticketEntities: testedTicketEntities,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				} )() );
			} );
			const testInstance = renderer.root.findByType( 'div' );
			expect( testInstance.props.hasNoAssignments ).toBe( false );
			expect( testInstance.props.noAssignmentsMessage )
				.toEqual( '' );
			expect( testInstance.props.assignmentCounts ).toEqual( testedAssignedCounts );
		} );
		it( 'returns expected values when incoming state for ticket has no ' +
			'dates assigned and then has dates assigned', () => {
			testedTicketEntities = [ allTickets[ 2 ] ];
			testedAssignedCounts.tickets[ 30 ] = 0;
			const Test = getTestComponent(
				{
					dateEntities: allDates,
					ticketEntities: testedTicketEntities,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );
			let div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage )
				.toEqual( expectedMessages.singleTicket );
			expect( div.props.assignmentCounts ).toEqual( testedAssignedCounts );

			// should update when ticket is assigned a date
			const updatedAssignedState = {
				assigned: { 40: [ 30 ] },
				removed: {},
			};
			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( false );
			expect( div.props.noAssignmentsMessage ).toEqual( '' );
			expect( div.props.assignmentCounts ).toEqual(
				{ ...testedAssignedCounts,
					dates: {
						...testedAssignedCounts.dates,
						40: 2,
					},
					tickets: {
						...testedAssignedCounts.tickets,
						30: 1,
					},
				},
			);
		} );
		it( 'returns expected values when incoming state for ticket has ' +
			'dates assigned and then a date is unassigned leaving the date ' +
			'with no assignments', () => {
			const Test = getTestComponent(
				{
					dateEntities: allDates,
					ticketEntities: testedTicketEntities,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );
			// update with assigned state removing the ticket
			const updatedAssignedState = {
				assigned: {},
				removed: { 40: [ 10 ] },
			};

			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			const div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage )
				.toEqual( expectedMessages.singleDate );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					40: 0,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					10: 2,
				},
			} );
		} );
		it( 'returns expected values when incoming state for ticket has ' +
			'dates assigned and then a date is unassigned leaving the ticket' +
			'with no assignments but all the dates with assignments', () => {
			testedTicketEntities = [ allTickets[ 1 ] ];
			const Test = getTestComponent(
				{
					dateEntities: allDates,
					ticketEntities: testedTicketEntities,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );

			// update with assigned state removing the ticket so it's orphaned
			const updatedAssignedState = {
				assigned: {},
				removed: { 60: [ 20 ] },
			};

			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			const div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage )
				.toEqual( expectedMessages.singleTicket );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					60: 1,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					20: 0,
				},
			} );
		} );
	} );
	describe( 'returns expected values when processing one date with many ' +
		'tickets', () => {
		beforeEach(
			() => {
				testedAssignedCounts = {
					dates: {
						40: 1,
						50: 1,
						60: 3,
					},
					tickets: {
						10: 3,
						20: 1,
						30: 1,
					},
				};
				testedDateEntities = [ allDates[ 0 ] ];
				// initially assigned state is empty.
			}
		);

		it( 'it returns expected values when tickets and dates all have an ' +
			'assignment', () => {
			act( () => {
				renderer = TestRenderer.create( getTestComponent( {
					dateEntities: testedDateEntities,
					ticketEntities: allTickets,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				} )() );
			} );
			const testInstance = renderer.root.findByType( 'div' );
			expect( testInstance.props.hasNoAssignments ).toBe( false );
			expect( testInstance.props.noAssignmentsMessage ).toEqual( '' );
			expect( testInstance.props.assignmentCounts ).toEqual( testedAssignedCounts );
		} );
		it( 'returns expected values when incoming state for date has no ' +
			'tickets assigned and then has a ticket assigned', () => {
			testedAssignedCounts.dates[ 40 ] = 0;
			testedAssignedCounts.tickets[ 10 ] = 2;
			const Test = getTestComponent(
				{
					dateEntities: testedDateEntities,
					ticketEntities: allTickets,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );
			let div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage ).toEqual(
				expectedMessages.singleDate
			);
			expect( div.props.assignmentCounts ).toEqual( testedAssignedCounts );

			// should update when date is assigned a ticket
			const updatedAssignedState = {
				assigned: { 40: [ 10 ] },
				removed: {},
			};
			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( false );
			expect( div.props.noAssignmentsMessage ).toEqual( '' );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					40: 1,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					10: 3,
				},
			} );
		} );
		it( 'returns expected values when incoming state for date has ' +
			'tickets assigned and then a ticket is unassigned leaving the date ' +
			'still with tickets, but the ticket with no dates', () => {
			testedDateEntities = [ allDates[ 2 ] ];
			const Test = getTestComponent(
				{
					dateEntities: testedDateEntities,
					ticketEntities: allTickets,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );
			// update with assigned state removing the ticket
			const updatedAssignedState = {
				assigned: {},
				removed: { 60: [ 30 ] },
			};

			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			const div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage )
				.toEqual( expectedMessages.singleDate );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					60: 2,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					30: 0,
				},
			} );
		} );
		it( 'returns expected values when incoming state for date has ' +
			'tickets assigned and then a ticket is unassigned leaving the date' +
			'with no assignments but all the tickets with assignments', () => {
			const Test = getTestComponent(
				{
					dateEntities: testedDateEntities,
					ticketEntities: allTickets,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );

			// update with assigned state removing the ticket so it's orphaned
			const updatedAssignedState = {
				assigned: {},
				removed: { 40: [ 10 ] },
			};

			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			const div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage ).toEqual( expectedMessages.singleDate );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					40: 0,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					10: 2,
				},
			} );
		} );
	} );
	describe( 'returns expected values when processing many dates with many ' +
		'tickets', () => {
		beforeEach(
			() => {
				testedAssignedCounts = {
					dates: {
						40: 1,
						50: 1,
						60: 3,
					},
					tickets: {
						10: 3,
						20: 1,
						30: 1,
					},
				};
				testedDateEntities = allDates;
				testedTicketEntities = allTickets;
				// initially assigned state is empty.
			}
		);

		it( 'it returns expected values when tickets and dates all have an ' +
			'assignment', () => {
			act( () => {
				renderer = TestRenderer.create( getTestComponent( {
					dateEntities: testedDateEntities,
					ticketEntities: testedDateEntities,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				} )() );
			} );
			const testInstance = renderer.root.findByType( 'div' );
			expect( testInstance.props.hasNoAssignments ).toBe( false );
			expect( testInstance.props.noAssignmentsMessage ).toEqual( '' );
			expect( testInstance.props.assignmentCounts ).toEqual( testedAssignedCounts );
		} );
		it( 'returns expected values when incoming state for a date has no ' +
			'tickets assigned and then has a ticket assigned', () => {
			testedAssignedCounts.dates[ 40 ] = 0;
			testedAssignedCounts.tickets[ 10 ] = 2;
			const Test = getTestComponent(
				{
					dateEntities: testedDateEntities,
					ticketEntities: allTickets,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );
			let div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage ).toEqual(
				expectedMessages.multiple
			);

			// should update when date is assigned a ticket
			const updatedAssignedState = {
				assigned: { 40: [ 10 ] },
				removed: {},
			};
			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( false );
			expect( div.props.noAssignmentsMessage ).toEqual( '' );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					40: 1,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					10: 3,
				},
			} );
		} );
		it( 'returns expected values when incoming state for a date has ' +
			'tickets assigned and then a ticket is unassigned leaving the date ' +
			'still with tickets, but the ticket with no dates', () => {
			const Test = getTestComponent(
				{
					dateEntities: testedDateEntities,
					ticketEntities: allTickets,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );
			// update with assigned state removing the ticket
			const updatedAssignedState = {
				assigned: {},
				removed: { 60: [ 30 ] },
			};

			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			const div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage )
				.toEqual( expectedMessages.multiple );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					60: 2,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					30: 0,
				},
			} );
		} );
		it( 'returns expected values when incoming state for a date has ' +
			'tickets assigned and then a ticket is unassigned leaving the date' +
			'with no assignments but all the tickets with assignments', () => {
			const Test = getTestComponent(
				{
					dateEntities: testedDateEntities,
					ticketEntities: allTickets,
					assignedCounts: testedAssignedCounts,
					assignedState: testedAssignedState,
				}
			);
			act( () => {
				renderer = TestRenderer.create( <Test /> );
			} );
			const testInstance = renderer.root;
			const getDiv = () => testInstance.findByType( 'div' );

			// update with assigned state removing the ticket so it's orphaned
			const updatedAssignedState = {
				assigned: {},
				removed: { 40: [ 10 ] },
			};

			act( () => {
				renderer.update(
					<Test assignedState={ updatedAssignedState } />
				);
			} );
			const div = getDiv();
			expect( div.props.hasNoAssignments ).toBe( true );
			expect( div.props.noAssignmentsMessage ).toEqual( expectedMessages.multiple );
			expect( div.props.assignmentCounts ).toEqual( {
				...testedAssignedCounts,
				dates: {
					...testedAssignedCounts.dates,
					40: 0,
				},
				tickets: {
					...testedAssignedCounts.tickets,
					10: 2,
				},
			} );
		} );
	} );
} );
