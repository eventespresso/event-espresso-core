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
		{ eventId }
	) => {
		return <EditorInitialization eventId={ eventId }>
			<WrappedComponent eventId={ eventId } />
		</EditorInitialization>;
	},
	'withEditorInitialization'
);

export default withEditorInitialization;
