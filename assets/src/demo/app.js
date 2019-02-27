import { TextInput, Button, Spinner } from '@wordpress/components';
import { Fragment, Component } from '@wordpress/element';
import { withState, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

class EventInput extends Component {
	constructor( props ) {
		super( props );
		this.state = { eventId: props.eventId };
	}

	setEventId = ( event ) => {
		this.setState( { eventId: event.target.value } );
	};

	onEventSubmit = () => this.props.onEventClick( this.state.eventId );

	render() {
		return <div>
			<TextInput
				label={ 'Enter the EventId here' }
				value={ this.state.eventId }
				onChange={ this.setEventId }
			/>
			<Button
				label={ 'Retrieve Event' }
				isPrimary={ true }
				onClick={ this.onEventSubmit }
			/>
		</div>;
	}
}

const DatesList = ( { datetimes, onDateClone } ) => {
	function getDatetimesList() {
		if ( datetimes.length > 0 ) {
			return datetimes.map( ( datetime ) => <li key={ datetime.id }>
				{ datetime.start.toFormat() }
				<br />
				<CloneDateTimeButton datetime={ datetime } onClick={ onDateClone } />
			</li> );
		}
		return <li><Spinner /></li>;
	}
	return <div>
		<h2>Datetimes List</h2>
		<ul>{ getDatetimesList() }</ul>;
	</div>;
};

const DatetimesList = withDispatch( ( dispatch, ownProps, { select } ) => {
	async function onDateClone( datetime ) {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { createEntity, createRelations } = dispatch( 'eventespresso/core' );
		const tickets = getRelatedEntities( datetime, 'tickets' );
		const newDateTime = await createEntity( 'datetime', datetime.forInsert );
		createRelations(
			'datetime',
			newDateTime.id,
			'tickets',
			tickets
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

const DateAndTicketList = ( { isInitializing, datetimes = [], tickets = [] } ) => {
	function getContent() {
		return isInitializing ?
			<Spinner /> :
			<Fragment>
				<DatetimesList datetimes={ datetimes } />
				<TicketsList tickets={ tickets } />
			</Fragment>;
	}
	return <div>{ getContent() }</div>;
};

const DatetimeAndTicketList = withSelect( ( select, ownProps ) => {
	const { isInitializing } = ownProps;
	const { getEntitiesForModel } = select( 'eventespresso/core' );
	if ( isInitializing ) {
		return ownProps;
	}
	return {
		datetimes: getEntitiesForModel( 'datetime' ),
		tickets: getEntitiesForModel( 'ticket' ),
	};
} )( DateAndTicketList );

const CloneDateTimeButton = ( { onCloneDateTime, datetime } ) => {
	function onClick() {
		onCloneDateTime( datetime );
	}
	return <Button onClick={ onClick } label={ 'Clone Datetime' } />;
};


const Main = ( { eventId, setState, isInitializing = true } ) => {
	return <div>
		<EventInput eventId={ eventId } onClick={ ( id ) => setState( { eventId: id } ) } />
		<DatetimeAndTicketList isInitializing={ isInitializing } /> :
	</div>;
}

export default compose( [
	withState( { eventId: 0 } ),
	withSelect( ( select, ownProps ) => {
		const { eventId, isInitializing } = ownProps;
		const {
			getEntityById,
			getRelatedEntities,
			getRelatedEntitiesForIds,
		} = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		if ( eventId === 0 || ! isInitializing ) {
			return ownProps;
		}
		const Event = getEntityById( eventId );
		if ( ! isModelEntityOfModel( Event ) ) {
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
] )( Main );

// @todo use the dom to insert the app and then setup a file this gets exported to.
// then enqueue this in EE admin somewhere for testing with.