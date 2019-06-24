import { useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withEventVenueEntity } from '@eventespresso/editor-hocs';

import useEditorInitialization from './use-editor-initialization';
import withEventEntity from './with-event-entity';
import withEventDateEntities from './with-event-date-entities';
import withTicketEntitiesForAllDateEntities from './with-ticket-entities-for-all-date-entities';
import { Provider } from './context';

const EditorInitialization = ( {
	eventEntityLoaded,
	dateEntitiesLoaded,
	ticketEntitiesLoaded,
	editorInitialized,
	setInitialized,
	children,
} ) => {
	useEffect( () => {
		if ( eventEntityLoaded && dateEntitiesLoaded && ticketEntitiesLoaded ) {
			setInitialized( true );
		}
	}, [ eventEntityLoaded, dateEntitiesLoaded, ticketEntitiesLoaded ] );
	return <Provider value={ editorInitialized }>
		{ children }
	</Provider>;
};

export default compose( [
	( WrappedComponent ) => ( props ) => {
		const [ editorInitialized, setInitialized ] = useEditorInitialization();
		return <WrappedComponent
			editorInitialized={ editorInitialized }
			setInitialized={ setInitialized }
			{ ...props }
		/>;
	},
	withEventEntity,
	withEventVenueEntity,
	withEventDateEntities,
	withTicketEntitiesForAllDateEntities,
] )( EditorInitialization );
