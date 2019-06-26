export {
	useEditorInitialized,
	Consumer,
} from './context';
export { default as withEventEntity } from './with-event-entity';
export { default as withEventDateEntities } from './with-event-date-entities';
export {
	default as withTicketEntitiesForAllDateEntities,
} from './with-ticket-entities-for-all-date-entities';

import { createHigherOrderComponent } from '@wordpress/compose';
import EditorInitialization from './editor-initialization';

const withEditorInitialization = createHigherOrderComponent(
	( WrappedComponent ) => (
		{ eventId, entityListView, entityListPerPage }
	) => {
		return <EditorInitialization eventId={ eventId }>
			<WrappedComponent
				eventId={ eventId }
				entityListView={ entityListView }
				entityListPerPage={ entityListPerPage }
			/>
		</EditorInitialization>;
	},
	'withEditorInitialization'
);

export default withEditorInitialization;
