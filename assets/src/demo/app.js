import { TextControl, Button, Spinner } from '@wordpress/components';
import { Fragment, Component, render as domRender } from '@wordpress/element';
import { withState, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import './app.css';

class EventInput extends Component {
	constructor( props ) {
		super( props );
		this.state = { eventId: props.eventId || 0 };
	}

	setEventId = ( id ) => {
		this.setState( { eventId: id } );
	};

	onEventSubmit = () => this.props.onEventClick( this.state.eventId );

	render() {
		return <div>
			<TextControl
				label={ 'Enter the EventId here' }
				value={ this.state.eventId }
				onChange={ this.setEventId }
			/>
			<Button
				label={ 'Retrieve Event' }
				isPrimary={ true }
				onClick={ this.onEventSubmit }
			>
				Retrieve Event
			</Button>
		</div>;
	}
}

const DatesList = ( { datetimes, onDateClone } ) => {
	function getDatetimesList() {
		if ( datetimes.length > 0 ) {
			return datetimes.map( ( datetime ) => <li key={ datetime.id }>
				{ datetime.start.toFormat() }
				<br />
				<CloneDateTimeButton
					datetime={ datetime }
					onCloneDateTime={ onDateClone }
				/>
			</li> );
		}
		return <li><Spinner /></li>;
	}
	return <div>
		<h2>Datetimes List</h2>
		<ul>{ getDatetimesList() }</ul>
	</div>;
};

const DatetimesList = withDispatch( ( dispatch, ownProps, { select } ) => {
	async function onDateClone( datetime ) {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { createEntity, createRelations } = dispatch( 'eventespresso/core' );
		const tickets = getRelatedEntities( datetime, 'tickets' );
		const newDateTime = await createEntity( 'datetime', datetime.forClone );
		createRelations(
			'datetime',
			newDateTime.id,
			'tickets',
			tickets
		);
		createRelations(
			'event',
			ownProps.eventId,
			'datetimes',
			[ newDateTime ]
		);
	}
	return { onDateClone };
} )( DatesList );

const TicketsList = ( { tickets } ) => {
	function getTicketsList() {
		if ( tickets.length > 0 ) {
			return tickets.map( ( ticket ) => <li key={ ticket.id }>{ ticket.name }</li> );
		}
		return <li><Spinner /></li>;
	}
	return <div>
		<h2>Tickets List</h2>
		<ul>{ getTicketsList() }</ul>
	</div>;
};

const DateAndTicketList = ( {
	eventId,
	isInitializing = true,
	datetimes = [],
	tickets = [],
} ) => {
	function getContent() {
		return isInitializing ?
			<Spinner /> :
			<Fragment>
				<DatetimesList eventId={ eventId } datetimes={ datetimes } />
				<TicketsList tickets={ tickets } />
			</Fragment>;
	}
	return <div>{ getContent() }</div>;
};

const DatetimeAndTicketList = compose( [
	withSelect( ( select, ownProps ) => {
		const { eventId, isInitializing = true } = ownProps;
		const {
			getEntityById,
			getRelatedEntities,
			getRelatedEntitiesForIds,
		} = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		if ( eventId === 0 || ! isInitializing ) {
			return ownProps;
		}
		const Event = getEntityById( 'event', eventId );
		if ( ! isModelEntityOfModel( Event, 'event' ) ) {
			return ownProps;
		}
		const Datetimes = getRelatedEntities( Event, 'datetimes' );
		const relatedIsResolved = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ Event, 'datetimes' ]
		);
		if ( ! relatedIsResolved ) {
			return ownProps;
		}
		if ( ! Datetimes.length ) {
			return {
				...ownProps,
				isInitializing: false,
			};
		}
		const datetimeIds = Datetimes.map( ( datetime ) => datetime.id );
		getRelatedEntitiesForIds( 'datetime', datetimeIds, 'tickets' );
		const relatedEntitiesIsResolved = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntitiesForIds',
			[ 'datetime', datetimeIds, 'tickets' ]
		);
		return {
			...ownProps,
			isInitializing: ! relatedEntitiesIsResolved,
		};
	} ),
	withSelect( ( select, ownProps ) => {
		const { isInitializing } = ownProps;
		const { getEntitiesForModel } = select( 'eventespresso/core' );
		if ( isInitializing ) {
			return ownProps;
		}
		return {
			datetimes: getEntitiesForModel( 'datetime' ),
			tickets: getEntitiesForModel( 'ticket' ),
		};
	} ),
] )( DateAndTicketList );

const CloneDateTimeButton = ( { onCloneDateTime, datetime } ) => {
	function onClick() {
		onCloneDateTime( datetime );
	}
	return <Button isPrimary={ true } onClick={ onClick } label={ 'Clone Datetime' } >
		Clone Datetime
	</Button>;
};

const MainContents = ( { eventId, setState } ) => {
	function onEventChange( id ) {
		setState( { eventId: id } );
	}
	function getDateAndTicketList() {
		return eventId === 0 ?
			'' :
			<DatetimeAndTicketList eventId={ eventId } />;
	}
	return <div>
		<EventInput eventId={ eventId } onEventClick={ onEventChange } />
		{ getDateAndTicketList() }
	</div>;
};

const Main = withState( { eventId: 0 } )( MainContents );

domRender( <Main />, document.getElementById( 'main-app' ) );
